local statusCb
local function StartMineSweeper(duration)
    SendNUIMessage({
        action = 'open',
        duration=duration
    })
    SetNuiFocus(true, true)
end

-- NUI Callback when finishing the game
RegisterNUICallback('endGame', function(data, cb)
    cb(true)
    statusCb(data)
    SetNuiFocus(false, false)
end)

exports('StartMinigame', function(duration, status)
    statusCb = status 
    StartMineSweeper(duration)
end)

