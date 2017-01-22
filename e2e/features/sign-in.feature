Feature: meal-planner sign-in page

  Scenario: Anonymous user
    Given an anonymous user
    When I open the sign-in page
    Then I should see the sign-in message
    And I should see the Login button
    And I should see the Sign Up button
