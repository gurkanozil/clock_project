<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>World Clock</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>World Clock</h1>

        <!-- Timezone Selector -->
        <label for="timezone">Select Timezone:</label>
        <select id="timezone">
            <?php
            $timezones = timezone_identifiers_list();
            foreach ($timezones as $timezone) {
                echo "<option value=\"$timezone\">$timezone</option>";
            }
            ?>
        </select>

        <!-- Toggle Clock Type (Digital/Analog) -->
        <button id="toggleClock">Switch to Analog</button>

        <!-- Clock Design Selector (Analog and Digital) -->
        <div id="designSelector" style="display: none;">
            <label for="clockDesign">Select Clock Design:</label>
            <select id="clockDesign">
                <option value="classic">Classic</option>
                <option value="modern">Modern</option>
                <option value="minimalist">Minimalist</option>
                <option value="futuristic">Futuristic</option>
            </select>
        </div>

        <!-- Clock Design Selector for Digital Clock -->
        <div id="digitalDesignSelector" style="display: none;">
            <label for="digitalClockDesign">Select Digital Clock Design:</label>
            <select id="digitalClockDesign">
                <option value="simple">Simple</option>
                <option value="bold">Bold</option>
                <option value="neon">Neon</option>
            </select>
        </div>

        <!-- Clock Container -->
        <div id="clockContainer">
            <!-- Digital Clock -->
            <div id="digitalClock" class="clock digital"></div>

            <!-- Analog Clock -->
            <div id="analogClock" class="clock analog" style="display: none;">
                <div class="clock-face">
                    <div class="hand hour-hand"></div>
                    <div class="hand min-hand"></div>
                    <div class="hand second-hand"></div>
                </div>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
