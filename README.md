overlays is a [NodeCG](http://github.com/nodecg/nodecg) bundle.
It works with NodeCG versions which satisfy this [semver](https://docs.npmjs.com/getting-started/semantic-versioning) range: `^1.1.1`
You will need to have an appropriate version of NodeCG installed to use it.

# Usage
## Tournament Begins
- Set flavor text to `welcome`
- Set commentator block
- Set break screen to `brb`
## Round Begins
- Set round
- Set team
- Set break screen to `rosters`, then `maps`
## Game Begins
- Switch OBS scene to `game`
- Set colors
- Show scores
## Game Ends
- Hide scores
- Update score
- Switch OBS scene to `break`
## Round Ends
- Set flavor text to `round x coming up`
- Set break screen to `brb`
- Reset score
