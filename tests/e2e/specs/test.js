// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('ion-content', 'All Products')
  })
  it("Tests the search bar",()=>{
    cy.visit('/tabs/tab2')
    cy.get('ion-searchbar')
    .type('laptop')
    cy.get('ion-item').contains('Laptop')
  })
  it("Tests product page",()=>{
    cy.visit('/tabs/tab2')
    cy.get('ion-searchbar').type('laptop')
    cy.contains('ion-list','Laptop').click()
    cy.get('h1').should('contain', 'Laptop')
  })
  it("Selects a catagory",()=>{
    cy.visit('tabs/tab1')
    cy.get('ion-chip').should('have','LAPTOPS').click()
    cy.get('.card').click()
    cy.get('h1')
  })
})
