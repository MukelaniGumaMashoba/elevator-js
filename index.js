// code gaming for the elevator:
{
  init: function(elevators, floors) {
      var elevator = elevators[0]; // Using the first elevator

      // When the elevator is idle (no more destinations)...
      elevator.on("idle", function() {
          // Go to all floors
          for (var i = 0; i < floors.length; i++) {
              elevator.goToFloor(i);
          }
      });
  },
  update: function(dt, elevators, floors) {
      // No actions needed here
  }
}