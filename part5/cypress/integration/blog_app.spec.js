describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Sys Admin',
      username: 'root',
      password: 'hunter1'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('root')
      cy.get('#password').type('hunter1')
      cy.get('#login-button').click()
      cy.contains('Sys Admin logged in!')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('wrong')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html')
        .should('not.contain', 'logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'hunter1' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Blog by cypress')
      cy.get('#author').type('End Toend')
      cy.get('#url').type('http://www.testUrl.com')
      cy.get('#create-button').click()
      cy.contains('Blog by cypress')
    })

    describe('And with blogs created', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'Blog by cypress', author: 'End Toend', contentUrl: 'http://www.testUrl.com' })
        cy.createBlog({ title: 'Another blog', author: 'Same author', contentUrl: 'http://www.sameUrl.com' })
        cy.createBlog({ title: 'Third blog', author: 'Still same', contentUrl: 'http://www.stillSameUrl.com' })
      })

      it('User can like a blog' , function() {
        cy.contains('Another blog').parent().as('theBlog')
          .contains('view').click()

        cy.get('@theBlog')
          .contains('like').click()

        cy.contains('likes 1')
      })

      it('Authorised user can delete blog', function() {
        cy.contains('Third blog').parent().as('theBlog')
          .contains('view').click()

        cy.get('@theBlog')
          .contains('remove').click()

        cy.get('html')
          .should('not.contain', 'Third blog')

        cy.contains('Removed blog succesfully')
      })

      it('Blogs are ordered by likes', function() {
        cy.contains('Blog by cypress').parent().as('firstBlog')
          .contains('view').click()

        cy.get('@firstBlog')
          .contains('like').click()

        cy.contains('Another blog').parent().as('secondBlog')
          .contains('view').click()

        for (let i = 0; i < 3; i++) {
          cy.get('@secondBlog')
            .contains('like').click()
          cy.wait(100)
        }

        cy.contains('Third blog').parent().as('thirdBlog')
          .contains('view').click()

        for (let i = 0; i < 4; i++) {
          cy.get('@thirdBlog')
            .contains('like').click()
          cy.wait(100)
        }

        cy.get('div.extendedBlog').then(($elements) => {
          expect($elements[0].innerText).to.have.string('Third blog')
          expect($elements[1].innerText).to.have.string('Another blog')
          expect($elements[2].innerText).to.have.string('Blog by cypress')
          expect($elements[2].innerText).to.not.have.string('Third blog')
        })
      })
    })
  })
})