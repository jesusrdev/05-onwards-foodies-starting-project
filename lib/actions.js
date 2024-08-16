"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text) {
  return text.trim() === "" || !text;
}

// For use useFormState is neccesary pass 2 parameters (prevState, formData)
export async function shareMeal(prevState, formData) {
  const meal = {
    // le pasamos como parametro al .get el atributo name del formulario
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image || meal.image.size === 0
  ) {
    return {
      message: 'Invalid input.',
    }
  }

  await saveMeal(meal);
  revalidatePath('/meals'); // layout: for nested pages, page: for this page by default
  redirect("/meals");
}
