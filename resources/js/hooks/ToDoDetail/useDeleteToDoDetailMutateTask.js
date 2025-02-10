import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const useDeleteToDoDetailMutateTask = () => {
    const queryClient = useQueryClient();
    const deleteToDoDetailMutation = useMutation(
        (toDoDetail) => axios.delete("/api/toDoDetails/" + toDoDetail.id),
        {
            onSettled: () => {
                queryClient.invalidateQueries("toDoList");
            },
        }
    );
    return { deleteToDoDetailMutation };
};

export default useDeleteToDoDetailMutateTask;
