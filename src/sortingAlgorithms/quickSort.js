export function quickSort(arr){
    var plan = {
        sorted:[],
        pos:[],
        swap:[],
        isPartition:[]
    };
    console.log(":p")
    console.log(plan);
    
    quickSortRec(arr,0,arr.length-1,plan);
    console.log(arr);
    plan.sorted = arr;
    console.log(plan);
    return plan;
}

function quickSortRec(arr,start, end,plan){
    console.log(":)");
    console.log(plan);
    if(start === end || end < start || start < 0 || end >= arr.length){
     return;
    }
    var pivot = partition(arr,start,end,plan);
    
    quickSortRec(arr,start,pivot-1,plan);
    
    quickSortRec(arr,pivot+1,end,plan);

}

function partition(arr,start,end,plan)
{
    var pivot = Math.floor((end + start)/2);
    var key = arr[pivot];

    plan.pos.push([pivot,pivot]);
    plan.swap.push(true);
    plan.isPartition.push(true);
    // console.log('-------------------------');
    // console.log(`Begining ${start}} and end ${end}`)
    // console.log(`pivot ${pivot} and key ${key}`);
    // console.log(arr);
    // console.log(`swappingn ${arr[pivot]} at position ${pivot} with ${arr[end]} at position ${end}`);
    console.log(plan);
    plan.pos.push([pivot,end]);
    plan.swap.push(true);
    plan.isPartition.push(false);
    swap(arr,pivot,end);
    // console.log(arr);

    var left = start;
    var right = end -1;
    plan.pos.push([left,right]);
    plan.swap.push(false);
    while(left< right){
        while(left < end && arr[left]<=key){
            left +=1;
            plan.pos.push([left,right]);
            plan.swap.push(false);
            plan.isPartition.push(false);
        }
        while(right >= start && arr[right] >key){
            right -=1;
            plan.pos.push([left,right]);
            plan.swap.push(false);
            plan.isPartition.push(false);
        }
        if(left< right){
            // console.log(`swappingn ${arr[left]} at position ${left} with ${arr[right]} at position ${right}`);
            swap(arr,left,right);
            plan.pos.push([left,right]);
            plan.swap.push(true);
            console.log(arr);
        }
    }
    if(arr[left]>key){
        // console.log(`swappingn ${arr[left]} at position ${left} with ${key} at position ${end}`);
        swap(arr,left,end);
        plan.pos.push([left,end]);
        plan.swap.push(true);
        plan.isPartition.push(false);
        //console.log(arr);
    }
    pivot = left;
    // console.log(`pivot pos ${pivot}`)
    // console.log('-------------------------');
    return pivot;
}
 
function swap(arr,i, j){
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}