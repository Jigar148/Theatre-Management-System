<?php
session_start();

// Assuming you have a session variable for selected seats
$selected_seats = $_SESSION['selected_seats']; // e.g., ['A1', 'A2']
$beverage_cost = isset($_POST['beverage_cost']) ? $_POST['beverage_cost'] : 0;
$ticket_price = 10; // Example price per ticket
$tax_rate = 0.1; // 10% tax

// Calculate total costs
$total_ticket_cost = count($selected_seats) * $ticket_price;
$total_cost = $total_ticket_cost + $beverage_cost;
$total_tax = $total_cost * $tax_rate;
$final_amount = $total_cost + $total_tax;

echo "Total Ticket Cost: $" . $total_ticket_cost . "<br>";
echo "Beverage Cost: $" . $beverage_cost . "<br>";
echo "Tax: $" . $total_tax . "<br>";
echo "Final Amount: $" . $final_amount;
?>

<!-- HTML Form for Checkout -->
<form method="post">
    <input type="number" name="beverage_cost" placeholder="Beverage Cost" required>
    <button type="submit">Checkout</button>
</form>