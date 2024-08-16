# carve-the-shape
a simple fivem ready minigame 

It's my first public script.
I am still learning how to deal with this stuff, so It may be not the best
If you  have found any bugs or errors / have any questions / know how to make this script better feel free to dm me on discord __ .poley __  

# [Preview](https://youtu.be/UbsBBfS5l3s)

# How to use it?
```
exports['carve-the-shape']:StartMinigame(Duration*1000,function(data)
    if data.status then
      --on success 
    elseif data.reason=='fail' then
     --on fail
    elseif data.reason=='close' then
      --on close
    end
end)

