<script>
  import {
    todoSelectors,
    addTodo,
    removeTodo,
    fetchRandomTodo
  } from "./slices/todoSlice";
  import { store, useSelector } from "./store";

  $: todoList = useSelector(
    todoSelectors.todos,
    newList => (todoList = newList)
  );

  $: todoListLoading = useSelector(
    todoSelectors.loading,
    newLoading => (todoListLoading = newLoading)
  );

  let newTodo;
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  ul {
    list-style: none;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <h1>Todos</h1>
  <hr />
  <input bind:value={newTodo} />
  <button on:click={() => store.dispatch(addTodo(newTodo))}>Add Todo</button>
  <button on:click={() => store.dispatch(fetchRandomTodo())}>
    Add Random Todo (API)
  </button>
  {#if todoListLoading}
    <h1>Loading...</h1>
  {/if}

  <ul>
    {#each todoList as todo}
      <li>
        {todo} -
        <button on:click={() => store.dispatch(removeTodo(todo))}>
          Remove
        </button>
      </li>
    {/each}
  </ul>
</main>
