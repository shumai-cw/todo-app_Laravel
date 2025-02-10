import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const useUpdateToDoDetailMutateTask = () => {
    const queryClient = useQueryClient();
    const updateToDoDetailMutation = useMutation(
        toDoDetail =>
            axios.put("/api/toDoDetails/" + toDoDetail.id , {
                name: toDoDetail.name,
                completed_flag: toDoDetail.completed_flag,
            }),
        {
            onMutate: async (toDoDetail) => {
                //実行中の取得処理のをキャンセル
                await queryClient.cancelQueries("toDoList");
                //既存のToDoリストを取得
                const previousToDoList = queryClient.getQueriesData("toDoList");
                //ToDoリストのキャッシュを更新
                queryClient.setQueryData("toDoList", oldToDoList =>
                    oldToDoList.map((oldToDo) => {
                        if (oldToDo.id == toDoDetail.to_do_id) {
                            let newToDoDetails = [];
                            oldToDo.to_do_details.map((oldToDoDetail) => {
                                if (oldToDoDetail.id == toDoDetail.id) {
                                    newToDoDetails.push({
                                        ...oldToDoDetail,
                                        name: toDoDetail.name,
                                        completed_flag:
                                            toDoDetail.completed_flag,
                                    });
                                } else {
                                    newToDoDetails.push(oldToDoDetail);
                                }
                            });
                            oldToDo.to_do_details = newToDoDetails;
                        }
                        return oldToDo;
                    })
                );
                //更新失敗時は既存のToDoリストを返却
                return { previousToDoList };
            },
            onSettled: () => {
                queryClient.invalidateQueries("toDoList");
            },
        }
    );
    return { updateToDoDetailMutation };
};

export default useUpdateToDoDetailMutateTask;
