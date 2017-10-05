describe('todo page', function() {
  beforeEach(function() {
    cy.request('/reset')
    cy.visit('/')
  });

  it('successfully loads with empty todolist', function() {
    cy.get('h1').should('contain', 'My todolist')
    cy.get('.item').should(($item) => {
      expect($item).to.have.length(0)
    });
    cy.url().should('match', /todo/)
  })

  describe('Adding items', function() {
    it('adds item to todolist and redirects', function() {
      cy.get('#newtodo').type('add_test_item')
      cy.get('#newsubmit').click()
      cy.get('.item').should(($items) => {
        expect($items).to.have.length(1)
      });
      cy.get('.item:first').should('contain', 'add_test_item');

      cy.url().should('match', /todo$/);
    });

    it('does not add if content empty', function() {
      cy.get('#newsubmit').click()
      cy.get('.item').should(($items) => {
        expect($items).to.have.length(0)
      });
    });

    // Testing XSS vulnerability
    it.skip('input not vulnerable to XSS', function() {
      // Will show an alert with "XSS" if not escaped
      let xss_input = `';alert(String.fromCharCode(88,83,83))//';alert(String.fromCharCode(88,83,83))//";
alert(String.fromCharCode(88,83,83))//";alert(String.fromCharCode(88,83,83))//--
></SCRIPT>">'><SCRIPT>alert(String.fromCharCode(88,83,83))</SCRIPT>`

      cy.get('#newtodo').type(xss_input)
      cy.get('#newsubmit').click()

      cy.get('.item:first').should('contain', xss_input);
    });
  });

  describe('Deleting items', function() {
    // Seed with a few todo items
    beforeEach(function() {
      for(var i = 0; i < 4; i++) {
        cy.get('#newtodo').type('add_test_item' + i)
        cy.get('#newsubmit').click()
      }
      cy.get('.item').should(($items) => {
        expect($items).to.have.length(4)
      });
    });

    it('deletes post at specific index', function() {
      cy.get('.item:first').should('contain','add_test_item0')
      cy.get('.item:first a').click()
      cy.get('.item').should(($items) => {
        expect($items).to.have.length(3)
      });
      cy.get('.item:first').should('contain','add_test_item1')
    });

    it('does not delete anything when :id not present', function() {
      cy.visit('/todo/delete/')
      cy.get('.item').should(($items) => {
        expect($items).to.have.length(4)
      });
    });
  });

  describe('Editing items', function() {
    beforeEach(function() {
      // Add first item
      cy.get('#newtodo').type('added_item')
      cy.get('#newsubmit').click()
      cy.get('.item:first').should('contain','added_item')
    });

    it('updates text of todo item', function() {
      // Edit first item and confirm it is updates
      cy.get('#updatetodo-0').type('editted_item')
      cy.get('#updatesubmit-0').click()
      cy.get('.item:first').should('contain','editted_item')
    });

    it('does not update anything when :id is not present', function() {
      cy.request('post', '/todo/edit')
      cy.reload()

      // Test the item did not change
      cy.get('.item:first').should('contain','added_item')
    });
  });
})
