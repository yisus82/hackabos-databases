USE sakila;
-- 1: how many actors have not acted in any films?
SELECT
  COUNT(*)
FROM
  actor
WHERE
  actor_id NOT IN (
    SELECT
      actor_id
    FROM
      film_actor
  );
--  2: how many films are out on rent?
SELECT
  COUNT(*)
FROM
  film
WHERE
  film_id IN (
    SELECT
      film_id
    FROM
      inventory
    WHERE
      inventory_id IN (
        SELECT
          inventory_id
        FROM
          rental
        WHERE
          return_date IS NULL
      )
  );
-- 3: which movie category generated the highest collection form rental income, how much is it?
SELECT
  category,
  total_sales
FROM
  sales_by_film_category
WHERE
  total_sales IN (
    SELECT
      MAX(total_sales)
    FROM
      sales_by_film_category
  );
-- 4: what is the most common hour when people pay for a dvd rental?
SELECT
  HOUR(payment_date) AS 'Most Common Hour'
FROM
  payment
GROUP BY
  HOUR(payment_date)
ORDER BY
  COUNT(*) DESC
LIMIT
  1;
-- Questions
  -- 1.What are the names of all the languages in the database (sorted alphabetically)?
SELECT
  name
FROM
  language
ORDER BY
  name;
-- 2.Return the full names (first and last) of actors with “SON ”in their last name, ordered by their first name.
SELECT
  CONCAT_WS(' ', first_name, last_name) AS 'Full Name'
FROM
  actor
WHERE
  last_name LIKE '%SON%'
ORDER BY
  first_name;
-- 3.Find all the addresses where the second address is not empty (i.e., contains some text), and return these second addresses sorted.
SELECT
  address2
FROM
  address
WHERE
  address2 IS NOT NULL
  AND address2 <> ''
ORDER BY
  address2;
-- 4.Return the first and last names of actors who played in a film involving a “Crocodile”and a “Shark”, along with the release year of the movie, sorted by the actors’last names.
SELECT
  first_name,
  last_name
FROM
  actor
WHERE
  actor_id IN (
    SELECT
      actor_id
    FROM
      film_actor
    WHERE
      film_id IN (
        SELECT
          film_id
        FROM
          film
        WHERE
          description LIKE '%Crocodile%'
          AND description LIKE '%Shark%'
      )
  );
-- 5.How many films involve a “Crocodile”and a “Shark”?
SELECT
  COUNT(*)
FROM
  film
WHERE
  description LIKE '%Crocodile%'
  AND description LIKE '%Shark%';
-- 6.Find all the film categories in which there are between 55 and 65 films.Return the names of these categories and the number of films per category, by the number of films.
SELECT
  category
FROM
  film_list
GROUP BY
  category
HAVING
  COUNT(*) >= 55
  AND COUNT(*) <= 65;
-- 7. In how many film categories is the average difference between the film replacement cost and the rental rate larger than 17?
  -- 8. Find the address district(s) name(s) such that the minimal postal code in the district(s) is maximal over all the districts. Make sure your query ignores empty postal codes and district names.
SELECT
  district
FROM
  address
WHERE
  postal_code >= ALL (
    SELECT
      MIN(postal_code)
    FROM
      address
    WHERE
      postal_code IS NOT NULL
      AND postal_code <> ''
    GROUP BY
      district
  );
-- 9. Find the names (first and last) of all the actors and customers whose first name is the same as the first name of the actor with ID 8. Do not return the actor with ID 8 himself. Note that you cannot use the name of the actor with ID 8 as a constant (only the ID). There is more than one way to solve this question, but you need to provide only one solution.
SELECT
  first_name,
  last_name,
  'ACTOR' AS 'TYPE'
FROM
  actor
WHERE
  first_name = (
    SELECT
      first_name
    FROM
      actor
    WHERE
      actor_id = 8
  )
  AND actor_id <> 8
UNION
SELECT
  first_name,
  last_name,
  'CUSTOMER' AS 'TYPE'
FROM
  customer
WHERE
  first_name = (
    SELECT
      first_name
    FROM
      actor
    WHERE
      actor_id = 8
  );