import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const useStoreToDoMutateTask = () => {
    const queryClient = useQueryClient();
    const storeToDoMutation = useMutation(
        () =>
            axios.post("/api/toDos", {
                title: "New_Task",
            }),
        {
            onSettled: () => {
                queryClient.invalidateQueries("toDoList");
            },
        }
    );
    return { storeToDoMutation };
};

export default useStoreToDoMutateTask;
