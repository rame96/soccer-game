import { Vector } from "base/vector";
import * as World from "base/world";
import { MoveTo } from "stp_vibes/skills/moveto";

const positions: Vector[] = [
    new Vector(0, -2.0),
    new Vector(2.2, -2),
    new Vector(0.001, -6.0),
    new Vector(1.6, -2),
    new Vector(1, -2),
    new Vector(-1.2, -2.0),
    new Vector(-2, -2.0),
    new Vector(2, -5.0),
];

export class Game {
    constructor() {}

    run() {
        if (World.Ball.pos.y > -6) {
            if (World.FriendlyRobotsById[1].pos.x < 2.2) {
                team();
            } else {
                score();
            }
        } else {
            runAround();
        }
    }
}

function team(): void {
    for (let i = 1; i <= 7; i++) {
        new MoveTo(World.FriendlyRobotsById[i]).run(positions[i], 1.57, 0.5);
    }
    new MoveTo(World.FriendlyRobotsById[0]).run(positions[0], 1.57, 0.5);
}

function runAround(): void {
    // Move robot at index 0 to position (4, 5.5)
    new MoveTo(World.FriendlyRobotsById[0]).run(new Vector(4, 5.5), 1.57, 5);

    // Move robot at index 5 to position (4, 5.5)
    new MoveTo(World.FriendlyRobotsById[5]).run(new Vector(4, 5.5), 1.57, 5);

	// Move robot at index 5 to position (4, 5.5)
	new MoveTo(World.FriendlyRobotsById[7]).run(new Vector(4, 5.5), 1.57, 5);

    // Move robot at index 6 to position (4, 5.5)
    new MoveTo(World.FriendlyRobotsById[6]).run(new Vector(4, 5.5), 1.57, 5);

    // Move other robots to stay in their original positions
    for (let i = 1; i <= 4; i++) {
        if (i !== 0 && i !== 5 && i !== 6) {
            new MoveTo(World.FriendlyRobotsById[i]).run(World.FriendlyRobotsById[i].pos, 1.57);
        }
    }
}


function score(): void {
    const robotIndex = 0;
    const targetPosition = new Vector(World.Ball.pos.x, -4);

    if (Math.abs(World.FriendlyRobotsById[robotIndex].pos.x - targetPosition.x) > 0.0005 &&
        World.FriendlyRobotsById[robotIndex].pos.y > World.Ball.pos.y) {
        // Move robot slightly above the ball
        new MoveTo(World.FriendlyRobotsById[robotIndex]).run(targetPosition.add(new Vector(0, -0.1)), 1.57, 0.5);
    } else {
        if (World.FriendlyRobotsById[robotIndex].pos.y < 1.95) {
            // Move to a position above the ball
            World.FriendlyRobotsById[robotIndex].setDribblerSpeed(1.0);
            World.FriendlyRobotsById[robotIndex].shootDisable();
            new MoveTo(World.FriendlyRobotsById[robotIndex]).run(targetPosition.add(new Vector(0, 1)), 1.57, 1);
        } else {
            // Move further above the ball, shoot, and reset dribbler
            new MoveTo(World.FriendlyRobotsById[robotIndex]).run(targetPosition.add(new Vector(0, 1.5)), 1.57, 1.5);
            World.FriendlyRobotsById[robotIndex].shoot(5);
            World.FriendlyRobotsById[robotIndex].setDribblerSpeed(0);
        }
    }
}

