function AddItemForm() {
  return (
    <form>
      <label for="item">
        Item
        <input id="id" type="text" value="" />
      </label>
      <div>
        <label>
          <input type="radio" value="7" name="next-purchase" />
          Soon
        </label>
        <label>
          <input type="radio" value="14" name="next-purchase" />
          Kind of Soon
        </label>
        <label>
          <input type="radio" value="30" name="next-purchase" />
          Not Soon
        </label>
      </div>
      <button type="submit">Add Item</button>
    </form>
  );
}

export default AddItemForm;
