Feature: meal-planner Header

  Scenario: Initial load
    When I open the app
    Then I should see the header
    And the header should display the brand name

  Scenario: On the groups page
    When I open the groups page
    Then I should see the header