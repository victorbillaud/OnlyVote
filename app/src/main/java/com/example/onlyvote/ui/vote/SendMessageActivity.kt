package com.example.onlyvote.ui.vote

import android.graphics.Color
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import com.example.onlyvote.R

/**
 * Second page of vote fragment class
 */
class SendMessageActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_send_message)

        val toolbar: Toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar)
        supportActionBar?.setTitle("Vérification mobile")
        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        window.statusBarColor = if (applicationContext.resources.configuration.isNightModeActive) Color.parseColor("#8585f6") else Color.parseColor("#000069")
    }
}