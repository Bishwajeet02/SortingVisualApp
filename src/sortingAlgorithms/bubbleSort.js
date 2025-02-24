export function bubbleSort(arr){
    var sorted = false;
    var moves = {
        sorted:[],
        pos:[],
        swap:[]
    };
    console.log(arr);
    for(let i = 0; i < arr.length - 1; i++){
        for(let j = 0; j< arr.length - i - 1; j++){
            if(arr[j] > arr[j+1]){
                moves.pos.push([j,j+1]);
                moves.swap.push(true);
                //moves.push([true,j,j+1]);
                swap(arr,j,j+1);
                //moves.push([false,j,j+1]);

                moves.pos.push([j,j+1]);
                moves.swap.push(false);
            }else{
                moves.pos.push([j,j+1]);
                moves.swap.push(false);
                //moves.push([false,j,j+1]);
            }
        }
    }
    console.log(moves);
    moves.sorted = arr;
    return moves;
}

function swap(arr,i, j){
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}