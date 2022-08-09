describe('Url Shortener', () => {

  beforeEach(() => {
    
    cy.intercept("GET", "http://localhost:3001/api/v1/urls", {
      statusCode: 201,
      fixture: "getUrls.json"
    });
    cy.visit('http://localhost:3000');
  });
  
  it('Should display shortened URLS stored in server on page load', () => {
    cy.contains("h3", "Awesome photo");
    cy.contains("p", "https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80")
    cy.contains("a", "http://localhost:3001/useshorturl/1");
  });

  it("Should show a form", () => {
    cy.contains("form")
    cy.get('input').first().should("have.class", "title-input")
    cy.get('input').eq(1).should("have.class", "url-input")
  });

  it("Should let a user type into the form", () => {
    cy.get(".title-input").type("Cool Url").should("have.value", "Cool Url");
    cy.get(".url-input").type("google.com").should("have.value", "google.com");
  });

  it("should let a user input a url they want shortened, and display it", () => {
    cy.intercept("POST", "http://localhost:3001/api/v1/urls", {
      statusCode: 201,
      fixture: "postedUrl.json"
    });
    cy.get(".title-input").type("Rippin' Elder Scrolls Soundtrack");
    cy.get(".url-input").type("https://www.youtube.com/watch?v=zBCI-JVe21Q&t=1284s&ab_channel=AmbientWorlds");
    cy.get("button").click();
    cy.contains("h3", "Rippin' Elder Scrolls Soundtrack");
    cy.contains("p", "https://www.youtube.com/watch?v=zBCI-JVe21Q&t=1284s&ab_channel=AmbientWorlds");
    cy.contains("a", "http://localhost:3001/useshorturl/2");
  });

  it("Should show an error message if the server has failed", () => {

    cy.intercept("GET", "http://localhost:3001/api/v1/urls", {
      statusCode: 404
    });
    cy.visit("http://localhost:3000")
    cy.contains("Oh no! An error occurred!")
  });

  it("Shouldn't let a user submit an incomplete form", () => {
    cy.intercept("POST", "http://localhost:3001/api/v1/urls", {
      statusCode: 422,
    });
    cy.visit("http://localhost:3000")
    cy.get(".title-input").type("Rippin' Elder Scrolls Soundtrack");
    cy.get("button").click();
    cy.contains("Failed to input all fields, try again")
  });
});