import { findById } from './rosterHelpers'

it('should return the expected item from an array', () => {
    const startRoster = [
        {
            id: 101,
            firstName: "Frank",
            lastName: "Hauser",
            playerActive: false,
            minutesPlayed: 0,
            startingEleven: false,
            yellowCard: false,
            redCard: false,
            goals: [],
            ownGoals: [],
            subIns: [],
            subOuts: [],
        },
        {
            id: 102,
            firstName: "Jeremy",
            lastName: "Rampon",
            playerActive: true,
            minutesPlayed: 0,
            startingEleven: false,
            yellowCard: false,
            redCard: false,
            goals: [],
            ownGoals: [],
            subIns: [],
            subOuts: [],
        },
        {
            id: 103,
            firstName: "Gabe",
            lastName: "Odess",
            playerActive: false,
            minutesPlayed: 0,
            startingEleven: false,
            yellowCard: false,
            redCard: false,
            goals: [],
            ownGoals: [],
            subIns: [],
            subOuts: [],
        }
    ]

    const expected = {
        id: 102,
        firstName: "Jeremy",
        lastName: "Rampon",
        playerActive: true,
        minutesPlayed: 0,
        startingEleven: false,
        yellowCard: false,
        redCard: false,
        goals: [],
        ownGoals: [],
        subIns: [],
        subOuts: [],
    }

    const result = findById(102, startRoster)

    expect(result).toEqual(expected)
})
