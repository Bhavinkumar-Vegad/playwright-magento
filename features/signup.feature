Feature: User Sign-Up and Sign-In

  Scenario: Sign up and login successfully
    Given I am on the home page
    When I click the Create Account button
    And I fill the sign up form with valid data
    And I submit the sign up form
    Then I should see registration success
    And I should see the user info on home page
    When I sign out
    And I click the Sign In button
    And I fill the sign in form with the registered email and password
    And I submit the sign in form
    Then I should see the user info as registered

  Scenario: Show errors when all required fields are empty
    Given I am on the home page
    When I click the Create Account button
    And I submit the sign up form
    Then I should see required errors:
      | First Name       |
      | Last Name        |
      | Email            |
      | Password         |
      | Confirm Password |

  Scenario: Show error when only First Name is empty
    Given I am on the home page
    When I click the Create Account button
    And I fill the sign up form with first name "" last name "Smith" email "brainsmith13071434@mailinator.com" password "Password123!"
    And I submit the sign up form
    Then I should see required errors:
      | First Name |

  Scenario: Show error when only Last Name is empty
    Given I am on the home page
    When I click the Create Account button
    And I fill the sign up form with first name "Brain" last name "" email "brainsmith13071434@mailinator.com" password "Password123!"
    And I submit the sign up form
    Then I should see required errors:
      | Last Name |

  Scenario: Show error when only Email is empty
    Given I am on the home page
    When I click the Create Account button
    And I fill the sign up form with first name "Brain" last name "Smith" email "" password "Password123!"
    And I submit the sign up form
    Then I should see required errors:
      | Email |
