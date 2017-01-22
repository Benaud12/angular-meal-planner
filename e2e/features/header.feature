Feature: meal-planner Header

  Scenario: Initial load
    Given an anonymous user
    When I open the app
    Then I should see the header
    And the header should display the brand name
