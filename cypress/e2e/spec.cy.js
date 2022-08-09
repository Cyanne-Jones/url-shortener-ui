describe('Url Shortener', () => {

  beforeEach(() => {
    
    cy.intercept("GET", "http://localhost:3001/api/v1/urls", {
      statusCode: 201,
      fixture: "getUrls.json"
    })
    cy.visit('http://localhost:3000');
  });
  
  it('Should display shortened URLS stored in server on page load', () => {
    cy.contains("h3", "Awesome photo");
    cy.contains("p", "https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80")
    cy.contains("a", "http://localhost:3001/useshorturl/1");
  });

});