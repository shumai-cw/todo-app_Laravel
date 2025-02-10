import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const useStoreToDoDetailMutateTask = () => {
    const queryClient = useQueryClient();
    const storeToDoDetailMutation = useMutation(
        toDo =>
            axios.post("/api/toDoDetails", {
                to_do_id: toDo.id,
                name: "New_Task",
            }),
        
    );
    return { storeToDoDetailMutation };
};

export default useStoreToDoDetailMutateTask;
