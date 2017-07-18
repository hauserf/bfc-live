export const generatedId = () => Math.floor(Math.random() * 100000)

export const findById = (id, list) => list.find(item => item.id === id)

export const togglePlayer = (player) => ({ ...player, playerActive: !player.playerActive })

export const addPlayer = (list, item) => [...list, item]

export const updatePlayer = (list, updated) => {
    const updatedIndex = list.findIndex(item => item.id === updated.id)
    return [
        ...list.slice(0, updatedIndex),
        updated,
        ...list.slice(updatedIndex + 1)
    ]
}
