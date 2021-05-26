describe('our first suite', () => {
  it('first test', () => {

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()
    //by Tag Name
    cy.get('input')

    //by ID
    cy.get('#inputEmail1')

    //by Class name
    cy.get('.input-full-width')

    //by Attribute name
    cy.get('[placeholder]')

    //by Attribute name and value
    cy.get('[placeholder="Email"]')

    //by Class value
    cy.get('[class="input-full-width size-medium shape-rectangle"]')

    //by Tag name and Attribute with value
    cy.get('input[placeholder="Email"]')

    //by two different attributes
    cy.get('[placeholder="Email"][type="email"]')

    //by Tag name, Attribute with value, ID and class name
    cy.get('[placeholder="Email"]#inputEmail1.input-full-width')

    // The most recommended way by Cypress
    cy.get('[data-cy="imputEmail1"]')
  })
  it('second test', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    // by adding own identifier to Sign In button
    cy.get('[data-cy="signInButton"]')

    //by text on element
    cy.contains('Sign in')

    //by unique Attribute name
    cy.contains('[status="warning"]', 'Sign in')

    /* What if it doesn't have any unique id or smth?
    1. We will search first unique element id in section with needed item
    2. We will jump to parents element
    3. We will find child element with HTML tag button
     */
    cy.get('#inputEmail3')
      .parents('form')
      .find('button')
      .should("contain", 'Sign in')
      .parents('form')
      .find('nb-checkbox')
      .click()

    //If we have unique only name of form
    cy.contains('nb-card', 'Horizontal form').find('[type="email"]')
  })
  it('then and wrap methods', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    // cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
    // cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should("contain", 'Password')
    // cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
    // cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should("contain", 'Password')

    //Cypress style
    //Note:  after .then it's going JQuery object
    cy.contains('nb-card', 'Using the Grid').then(firstForm => {
      const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
      const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
      expect(emailLabelFirst).to.equal('Email')
      expect(passwordLabelFirst).to.equal('Password')

      //if we need to compare some value from firstForm context (password label in that case) and from another form
      cy.contains('nb-card', 'Basic form').then(secondForm => {
        const passwordSecondText = secondForm.find('[for="exampleInputPassword1"]').text()
        expect(passwordLabelFirst).to.equal(passwordSecondText)

        /* if we need to make some action with context from firstForm or secondForm the only way is
        to use wrap() func as it make JQuery object back to Cypress object
        */
        cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
      })
    })
  })
  it('Invoke command', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()


    //1 method of work with text in Cypress
    cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

    //2
    cy.get('[for="exampleInputEmail1"]').then(label => {
      expect(label.text()).to.equal('Email address')
    })

    //3
    cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
      expect(text).to.equal('Email address')
    })
    //3 method to check that checkbox is checked (attribute name changed)
    cy.contains('nb-card', 'Basic form')
      .find('nb-checkbox')
      .click()
      .find('.custom-checkbox')
      .invoke('attr', 'class')
      // easiest way
      // .should("contain", 'checked')

      // harder way
      .then(classValue => {
        expect(classValue).to.contain('checked')
      })
  })
  it('assert property', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()

    cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
      cy.wrap(input).click()
      cy.get('nb-calendar-day-picker').contains('24').click()
      cy.wrap(input).invoke('prop', 'value').should('contain', 'May 24, 2021')
    })
  })
  it.only('radio button', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {

      cy.wrap(radioButtons)
        .first()
        .check({force: true})
        .should('be.checked')

      cy.wrap(radioButtons)
        .eq(1)
        .check({force: true})
        .should('be.checked')

      cy.wrap(radioButtons)
        .first()
        .should('not.be.checked')

      cy.wrap(radioButtons)
        .eq(2)
        .should('be.disabled')
    })

  })
  it.only('radio button', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

  })
})
