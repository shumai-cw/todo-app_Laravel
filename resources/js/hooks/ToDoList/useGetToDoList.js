const { default: axios } = require("axios")
const { useQuery, useQueryClient } = require("react-query");

const getToDoList = async() =>{
    const { data } = await axios.get("/api/toDos");
    return data;
}

const useGetToDoList = () =>{
    const queryClient = useQueryClient();
    return useQuery("toDoList",getToDoList,{
        onError: () => {
            queryClient.setQueryData("toDoList", null);
        }
    });
}

export default useGetToDoList;