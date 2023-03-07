import Ingredient from "../models/Ingredient.js";

export const getIngredients = async (req, res, next) => {
  try {
    const ingredients = await Ingredient.find();
    res.status(200).json(ingredients);
  } catch (error) {
    next(error);
  }
};
export const getIngredient = async (req, res, next) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    res.status(200).json(ingredient);
  } catch (error) {
    next(error);
  }
};

export const getByCategory = async (req, res, next) => {
  try {
    const cat = req.params.id;
    const iList = req.params.list;
    const ingredients = await Ingredient.find({category: cat});
    const list = await Promise.all(
      ingredients.map((ingredient) => {
        return ingredient
      })
    );


    const filterList = (ingredients, basicIngredients) => {
      return ingredients.filter((ingredient) => {
        return basicIngredients.indexOf(ingredient.name) === -1 
      });
    }
    
    const filtered = filterList(list, iList);

    res.status(200).json(filtered);
  } catch (error) {
    next(error);
  }
};

export const createIngredient = async (req, res, next) => {
  const newIngredient = new Ingredient(req.body);

  try {
    const savedIngredient = await newIngredient.save();
    res.status(200).json(savedIngredient);
  } catch (error) {
    next(error);
  }
};
export const updateIngredient = async (req, res, next) => {
  try {
    const updatedIngredient = await Ingredient.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedIngredient);
  } catch (error) {
    next(error);
  }
};
export const deleteIngredient = async (req, res, next) => {
  try {
    await Ingredient.findByIdAndDelete(req.params.id);
    res.status(200).json("Ingredient deleted.");
  } catch (error) {
    next(error);
  }
};
