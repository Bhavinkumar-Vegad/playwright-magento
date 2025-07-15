Feature: User Sign-In

  Scenario: Sign in with valid credentials
    Given I am on the home page
    When I click the Sign In button
    And I fill the sign in form with email "johnsmith@mailinator.com" and password "Password123!"
    And I submit the sign in form
    Then I should see the user info as "John" "Smith"