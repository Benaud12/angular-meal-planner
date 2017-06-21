Feature: meal-planner login page

  Scenario: Anonymous user
    Given an anonymous user
    When I open the login page
    Then I should see the login message
    And I should see the Log In button
    And I should not see the Log In input fields
    And I should see the Sign Up button
    And I should not see the Sign Up input fields

  Scenario: Clicking Log In
    Given an anonymous user
    When I open the login page
    And I click the Log In button
    Then I should see the Log In input fields
    And I should not see the Sign Up input fields

  Scenario: Clicking Sign Up
    Given an anonymous user
    When I open the login page
    And I click the Sign Up button
    Then I should see the Sign Up input fields
    And I should not see the Log In input fields

  Scenario: Clicking from Log In to Sign Up
    Given an anonymous user
    When I open the login page
    And I click the Log In button
    And I should see the Log In input fields
    And I click the Sign Up button
    Then I should see the Sign Up input fields
    And I should not see the Log In input fields

  Scenario: Successful new user registration
    Given an anonymous user
    When I open the login page
    And I click the Sign Up button
    And I enter my sign up details
    And I click the Sign Up button
    Then I should be redirected to the week page
