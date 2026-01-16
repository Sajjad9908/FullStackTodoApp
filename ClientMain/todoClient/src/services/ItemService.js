

export const AddItemToServer=async(task,date)=>{
    try {
        const response=await fetch('http://localhost:5000/api/todo',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({task,date})
        });

        // Expect shape: { message, todoItem }
        const data = await response.json();
        if(!data || !data.todoItem){
            console.error("Unexpected server response while adding item:", data);
            return null;
        }

        return mapServerItemToClientItem(data.todoItem);
    } catch (error) {
        console.error("Error adding item to server:", error);
        return null;
    }
}

function mapServerItemToClientItem (serverItem){
    return{
        id:serverItem._id,
        name:serverItem.task,
        dueDate:serverItem.date,
        completed:serverItem.completed,
        createdAt:serverItem.createdAt,
        updatedAt:serverItem.updatedAt

    }
}

export const getItemsFromServer=async()=>{
    try {
        const res=await fetch('http://localhost:5000/api/todo/getitem');
        const data=await res.json();
        return data.todoItem.map(mapServerItemToClientItem);
    } catch (error) {
        console.error("Error fetching items from server:", error);
        return [];
    }
}

export const MarkItemCompletedOnServer=async(id)=>{
    try {
        const res =await fetch(`http://localhost:5000/api/todo/${id}/completed`,{
            method:'PUT'
        });
        const data=await res.json();
        return mapServerItemToClientItem(data.todoItem);
    } catch (error) {
        return res.json({error:"Internal Server Error",error: error.message} );
    }
}

export const DeletefromServer=async(id)=>{
    try {
        const res=await fetch(`http://localhost:5000/api/todo/${id}`,{
            method:'DELETE'
        });
        const data=await res.json();
        return data;                
    } catch (error) {
        console.error("Error deleting item:", error);
        return null;
    }
}
export const updateItemOnServer=async(id,updateItem)=>{
    try {
        console.log("Sending update request:", {id, updateItem}); // Debug log
         const response=await fetch(`http://localhost:5000/api/todo/${id}/update`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(updateItem)
        })
        console.log("Response status:", response.status); // Debug log
        if(!response.ok){
            const errorData = await response.json();
            console.error("Server error response:", errorData);
            return null;
        }
        const data=await response.json();
        console.log("Update response data:", data);
        if(!data || !data.updateItem){
            console.error("Unexpected server response while updating item:", data);
            return null;
        }

        return mapServerItemToClientItem(data.updateItem);
    } catch (error) {
        console.error("Error updating item on server:", error);
        return null;
    }
       
    
    }