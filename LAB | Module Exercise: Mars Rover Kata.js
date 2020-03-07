
// Initialization
// ======================
// Rover Object Goes Here
const rover1 = {
	name: "Curiosity",
    x:1,
    y:1,
    direction: "N",
    travelLog: []
}
const rover2 = {
	name: "Opportunity",
    x:3,
    y:7,
    direction: "E",
    travelLog: []
}
const rover3 = {
	name: "Spirit",
    x:5,
    y:3,
    direction: "S",
    travelLog: []
}
const rover4 = {
	name: "Endurance",
	x:8,
    y:5,
    direction: "W",
    travelLog: []
}
// Declaring Array of Rovers
const rovers = [rover1, rover2, rover3, rover4]

// Declaring Cardinal Points to Keep Rover's Direction
const cardinalPoints = ["N", "E", "S", "W"]

// Map Grid
const grid = []
// Create Grid
for (let row = 0; row < 10; row++) {
    let gridRow = []
    for (let col = 0; col < 10; col++) {
        gridRow.push(" ")        
    }
    grid.push(gridRow)
}

// Initialize Rovers' Positions on Grid:
rovers.forEach(rover => {
    grid[rover.y][rover.x] = "O"
});

// Create Grid's Obstacles
// In order to simplify the Rover's journey, we will create just 1 obstacle per row/col
for (let row = 0; row < 10; row++) {
    let col = Math.floor(Math.random() * 10)
    // Preventing Rover's Position to be Overwritten by an Obstacle
    while (grid[row][col] === "O") {
        col = Math.floor(Math.random() * 10)
    }
    grid[row][col] = "#"
}

// ======================

// Movement Functions
function turnLeft(rover){
    console.log("turnLeft was called!");
    console.log(`Current Rover Direction: ${rover.direction}`);
    if (cardinalPoints.indexOf(rover.direction) === 0) {
        rover.direction = cardinalPoints[3]
    }
    else {
        rover.direction = cardinalPoints[cardinalPoints.indexOf(rover.direction) - 1]
    }
    console.log(`New Rover Direction: ${rover.direction}`);
}

function turnRight(rover){
    console.log("turnRight was called!");
    console.log(`Current Rover Direction: ${rover.direction}`);
    rover.direction = cardinalPoints[(cardinalPoints.indexOf(rover.direction) + 1) % 4]
    console.log(`New Rover Direction: ${rover.direction}`);
}

function moveForward(rover){
    console.log("moveForward was called")
    console.log(`Current Rover Direction: ${rover.direction}`);
    console.log(`Current Rover Position: 
    X: ${rover.x}
    Y: ${rover.y}`)
    let currentRoverPosition = {x: rover.x, y: rover.y}
    let destination = {}
    switch (rover.direction) {
        case "N":
            // Declaring destination to check for other Rovers or Obstacles
            destination = {x: rover.x, y: rover.y - 1}
            console.log(`DESTINATION:`)
            console.log(destination)
            // Enforcing Boundaries
            if (rover.y === 0) {
                console.log("The Rover can't roam off the map!")
            } else if (grid[destination.y][destination.x] === "#") {
                console.log("The Rover can't move to that destination. There's an obstacle!")
            } else if (grid[destination.y][destination.x] === "O") {
                console.log("The Rover can't move to that destination. There's an Rover operating on that spot!")
            } else {
                /* 
                    We need to repeat this instruction 
                    [ rover.travelLog.push(currentRoverPosition) ]
					because the exercise: 
					Iteration 5 | Tracking 
					demands to do it "after each move"
                    This could be optimized by just writing that instruction in a single line of code
                    beneath the currentRoverPosition declaration (in other words, just write 
                    rover.travelLog.push(currentRoverPosition) in line 41), but it'll also keep track
                    of the iterations in which it couldn't  move due to map limitations
                */
				rover.travelLog.push(currentRoverPosition)
				// Updating the Grid's Situation
				grid[rover.y][rover.x] = " "
				rover.y--
				grid[rover.y][rover.x] = "O"
				console.log(grid)
            }
            break;
        case "E":
            destination = {x: rover.x + 1, y: rover.y}
            console.log(`DESTINATION:`)
            console.log(destination)
            // Enforcing Boundaries
            if (rover.x === 9) {
                console.log("The Rover can't roam off the map!")
            } else if (grid[destination.y][destination.x] === "#") {
                console.log("The Rover can't move to that destination. There's an obstacle!")
            } else if (grid[destination.y][destination.x] === "O") {
                console.log("The Rover can't move to that destination. There's an Rover operating on that spot!")
            } else {
                rover.travelLog.push(currentRoverPosition)
				grid[rover.y][rover.x] = " "
				rover.x++
				grid[rover.y][rover.x] = "O"
            }
            break
        case "S":
            destination = {x: rover.x, y: rover.y + 1}
            console.log(`DESTINATION:`)
            console.log(destination)
            // Enforcing Boundaries
            if (rover.y === 9) {
                console.log("The Rover can't roam off the map!")
            }  else if (grid[destination.y][destination.x] === "#") {
                console.log("The Rover can't move to that destination. There's an obstacle!")
            }  else if (grid[destination.y][destination.x] === "O") {
                 console.log("The Rover can't move to that destination. There's an Rover operating on that spot!")
            }   else {
                  rover.travelLog.push(currentRoverPosition)
				  grid[rover.y][rover.x] = " " 
				  rover.y++
				  grid[rover.y][rover.x] = "O"
            }
            break
        case "W":
            destination = {x: rover.x - 1, y: rover.y}
            console.log(`DESTINATION:`)
            console.log(destination)
            // Enforcing Boundaries
            if (rover.x === 0) {
                console.log("The Rover can't roam off the map!")
            } else if (grid[destination.y][destination.x] === "#") {
                console.log("The Rover can't move to that destination. There's an obstacle!")
            } else if (grid[destination.y][destination.x] === "O") {
                console.log("The Rover can't move to that destination. There's an Rover operating on that spot!")
            } else {
                rover.travelLog.push(currentRoverPosition)
				grid[rover.y][rover.x] = " "
				rover.x--
				grid[rover.y][rover.x] = "O"
            }
            break
        default:
            break;
    }
    console.log(`New Rover Position: 
    X: ${rover.x}
    Y: ${rover.y}`)
}

function moveBackward(rover){
	
    console.log("moveBackward was called")
    console.log(`Current Rover Direction: ${rover.direction}`);
    console.log(`Current Rover Position: 
    X: ${rover.x}
    Y: ${rover.y}`)
    let currentRoverPosition = {x: rover.x, y: rover.y}
    let destination = {}
    switch (rover.direction) {
        case "N":
            destination = {x: rover.x, y: rover.y + 1}
            console.log(`DESTINATION:`)
            console.log(destination)
            // Enforcing Boundaries
            if (rover.y === 9) {
                console.log("The Rover can't roam off the map!")
            }  else if (grid[destination.y][destination.x] === "#") {
                console.log("The Rover can't move to that destination. There's an obstacle!")
            }  else if (grid[destination.y][destination.x] === "O") {
                console.log("The Rover can't move to that destination. There's an Rover operating on that spot!")
            }  else {
                rover.travelLog.push(currentRoverPosition)
				grid[rover.y][rover.x] = " "
				rover.y++
				grid[rover.y][rover.x] = "O"
            }
            break;
        case "E":
            destination = {x: rover.x - 1, y: rover.y}
            console.log(`DESTINATION:`)
            console.log(destination)
            // Enforcing Boundaries
            if (rover.x === 0) {
                console.log("The Rover can't roam off the map!")
            }  else if (grid[destination.y][destination.x] === "#") {
                console.log("The Rover can't move to that destination. There's an obstacle!")
            }  else if (grid[destination.y][destination.x] === "O") {
                console.log("The Rover can't move to that destination. There's an Rover operating on that spot!")
            }  else {
                rover.travelLog.push(currentRoverPosition)
				grid[rover.y][rover.x] = " "
				rover.x--
				grid[rover.y][rover.x] = "O"
            }
            break
        case "S":
            destination = {x: rover.x, y: rover.y - 1}
            console.log(`DESTINATION:`)
            console.log(destination)
            // Enforcing Boundaries
            if (rover.y === 0) {
                console.log("The Rover can't roam off the map!")
            }  else if (grid[destination.y][destination.x] === "#") {
                console.log("The Rover can't move to that destination. There's an obstacle!")
            }  else if (grid[destination.y][destination.x] === "O") {
                console.log("The Rover can't move to that destination. There's an Rover operating on that spot!")
            }  else {
                rover.travelLog.push(currentRoverPosition)
				grid[rover.y][rover.x] = " "
				rover.y--
				grid[rover.y][rover.x] = "O"
            }
            break
        case "W":
            destination = {x: rover.x + 1, y: rover.y}
            console.log(`DESTINATION:`)
            console.log(destination)
            // Enforcing Boundaries
            if (rover.x === 9) {
                console.log("The Rover can't roam off the map!")
            }  else if (grid[destination.y][destination.x] === "#") {
                console.log("The Rover can't move to that destination. There's an obstacle!")
            }  else if (grid[destination.y][destination.x] === "O") {
                console.log("The Rover can't move to that destination. There's an Rover operating on that spot!")
            }  else {
                rover.travelLog.push(currentRoverPosition)
				grid[rover.y][rover.x] = " "
				rover.x++
				grid[rover.y][rover.x] = "O"
            }
            break
        default:
            break;
    }
    console.log(`New Rover Position: 
    X: ${rover.x}
    Y: ${rover.y}`)
}

// ==============================

// Command and UI Functions

function commands(strCommands) {
    // As the Rovers take turns for moving, we will assume that every rover follows the same
    // Instruction sequence. 
    // i.e.: for the sequence "frfblf", all 3 Rovers will follow the same commands.
    // Rover 1 will go F, then Rover 2, then Rover 3.
    // After that, Rover 1 will go R, Rover 2 will fo R and Rover 3 will go R. 
    for (let index = 0; index < strCommands.length; index++) {
        switch (strCommands[index]) {
            case "f":
                rovers.forEach(rover => {
                    moveForward(rover)
                });
                break;
            case "r":
                rovers.forEach(rover => {
                    turnRight(rover)
                });
                break
            case "l":
                rovers.forEach(rover => {
                    turnLeft(rover)
                });
                break
            case "b":
                rovers.forEach(rover => {
                    moveBackward(rover)
                });
                break
            default:
                break;
        }
    }
}

console.log(`ROVER'S MARS MAP:`)
console.log(grid)
commands("ffzzyrffrfflfrbblbbbbbb")

//============================================

// Results Logs

console.log("MAP FINAL SITUATION AFTER COMMANDS EXECUTION:")
console.log(grid)
console.log(`Rovers' Travel Log:`)
    rovers.forEach(rover => {
		console.log(`${rover.name}:`)
        rover.travelLog.forEach(element => {
        console.log(element)
        });
    });