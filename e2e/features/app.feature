Feature: meal-planner App

  Scenario: App Loads
    Given an anonymous user
    When I open the app
    Then I should be redirected to the login page
