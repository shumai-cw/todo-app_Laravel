import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const useUpdateToDoMutateTask = () => {
    const queryClient = useQueryClient();
    const updateToDoMutation = useMutation(
        toDo => axios.put("/api/toDos/" + toDo.id, { title: toDo.title }),
        {
            onMutate: async (toDo) => {
                //実行中の取得処理をキャンセル
                await queryClient.cancelQueries("toDoList");
                //既存のToDoリストを取得
                const previousToDoList = queryClient.getQueriesData("toDoList");
                //ToDoリストのキャッシュを更新
                queryClient.setQueryData("toDoList", (oldToDoList) =>
                    oldToDoList.map(oldToDo => {
                        if (oldToDo.id == toDo.id) {
                            return {
                                ...oldToDo,
                                title: toDo.title,
                            };
                        }
                        return oldToDo;
                    })
                );
                //更新失敗時は既存のToDoリストを返却
                return { previousToDoList };
            },
            onSettled: () => {
                queryClient.invalidateQueries("toDoList");
            }
        }
    );
    return { updateToDoMutation };
};

export default useUpdateToDoMutateTask;

