package com.qa.domain;

import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import javax.swing.border.Border;

public class Stopwatch implements ActionListener {

    JFrame frame = new JFrame();
    JLabel timeLabel = new JLabel();
    int elapsedTime = 0;
    int seconds = 0;
    int minutes = 0;
    int hours = 0;
    boolean started = false;
    String seconds_string = String.format("%02d", seconds);
    String minutes_string = String.format("%02d", minutes);
    String hours_string = String.format("%02d", hours);

    Stopwatch() {

        timeLabel.setText(hours_string + ":" + minutes_string + ":" + seconds_string);
        timeLabel.setBounds(100, 100, 200, 100);
        timeLabel.setFont(new Font("Verdana", Font.PLAIN, 350));
        timeLabel.setBorder(BorderFactory.createBevelBorder(1));
        timeLabel.setOpaque(true);
        timeLabel.setHorizontalAlignment(JTextField.CENTER);

        frame.add(timeLabel);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(200, 400);
        frame.setLayout(null);
        frame.setVisible(true);
    }

    @Override
    public void actionPerformed(ActionEvent actionEvent) {

    }

    void start() {

    }

    void stop() {

    }

    void reset() {

    }
}
