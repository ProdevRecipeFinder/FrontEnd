import { IngredientInputType } from '../generated/graphql';

export default function getIngredientsData ( ingredientsData: string[] ): IngredientInputType[] {
    const units = 
    [ 
        "cup", "cups", "gram", "grams", "ounce", "ounces", "pound", "pounds","dash", "dashes", "handful", "handfuls", "head", "heads", "jar", "jars", "large", "largely", "medium", "mediumly", "small", "slightly",
        "sprig", "sprigs", "can", "cans", "package", "packages", "pinch", "pinches", "quart", "quarts", "small", "smallly", "slice", "slices", "stick", "sticks",
        "stick", "sticks", "tablespoon", "tablespoons", "teaspoon", "teaspoons", "tsp", "tbsp", "oz", "lb", "clove", "cloves", "dash", "dashes", "handful", "handfuls",
        "head", "heads", "jar", "jars", "large", "largely", "medium", "mediumly", "small", "slightly", "sprig", "sprigs", "can", "cans", "package", "packages",
        "pinch", "pinches", "quart", "quarts", "small", "smallly", "slice", "slices", "stick", "sticks", "stick", "sticks", "tablespoon", "tablespoons",
        "teaspoon", "teaspoons", "tsp", "tbsp", "oz", "lb", "clove", "cloves", "dash", "dashes", "handful", "handfuls", "head", "heads", "jar", "jars",
    ];


    let result = ingredientsData.map( ingredient => {
        // // Check if ingredient includes any of the units in the array above
        if ( units.some( unit => ingredient.includes( unit ) ) ) {
            // get unit in ingredient
            const unit = units.find( unit => ingredient.includes( unit ) );

            const words = ingredient.split( " " );

            const indexOfUnit = words.findIndex( word => word.includes( unit as string ));

            // get quantity, as indexOfUnit being the pivot. We want the left side of the array
            const quantity = words.slice( 0, indexOfUnit ).join( " " );

            // get ingredient name, as indexOfUnit being the pivot. We want the right side of the array
            const ingredientName = words.slice( indexOfUnit + 1 ).join( " " );

            return {
                "quantity": quantity.trimLeft().trimRight(),
                "unit": unit?.trimLeft().trimRight(),
                "ingredient": ingredientName.trimLeft().trimRight(),
            };

        } else {
            // Search for first number in ingredient
            const words = ingredient.split( " " );
            const number = words.find( word => word.match( /\d+/g ) );

            if ( !number )
                return;

            const indexOfNumber = ingredient.indexOf( number );

            // get quantity
            const quantity = number;

            // get ingredient name
            const ingredientName = ingredient.slice( indexOfNumber + number.length );

            return {
                "quantity": quantity.trimLeft().trimRight(),
                "unit": "",
                "ingredient": ingredientName.trimLeft().trimRight(),
            };
        }
    } );

    result = result.filter( i => i !== undefined );

    return result as IngredientInputType[];
}