package com.example.onlyvote.ui.vote

import android.content.Intent
import android.content.res.ColorStateList
import android.graphics.Color
import android.os.Bundle
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import com.example.onlyvote.MainActivity
import com.example.onlyvote.R
import com.example.onlyvote.data.CodeRequest
import com.google.gson.Gson
import java.io.InputStreamReader
import java.net.HttpURLConnection
import java.net.URL

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

        val textViewChoice: TextView = findViewById(R.id.textViewChoice)

        textViewChoice.setText("Votre choix est " + intent.extras?.get("candidate"))

        val cancelButton: Button = findViewById(R.id.buttonCancel)

        cancelButton.setOnClickListener {
            startActivity(Intent(this, MainActivity::class.java))
        }

        val sendCode: Button = findViewById(R.id.buttonSendCode)
        val phoneCode: EditText = findViewById(R.id.editTextPhoneCode)

        sendCode.setOnClickListener {
            if (phoneCode.length() == 10) {
                sendCode(phoneCode.text.toString()).start()

                val intentCode = Intent(this, CheckCodeActivity::class.java)
                intentCode.putExtra("candidate", intent.extras?.get("candidate").toString())
                intentCode.putExtra("idCandidate", intent.extras?.get("idCandidate").toString())
                intentCode.putExtra("phone", phoneCode.text)

                startActivity(intentCode)
            } else {
                phoneCode.backgroundTintList = ColorStateList.valueOf(Color.parseColor("#e1000f"))
            }
        }
    }

    /**
     * Send code with phone number to api
     * @param phoneNumber
     */
    private fun sendCode(phoneNumber: String) : Thread {
        return Thread {
            val url = URL("https://onlyvote.victorbillaud.fr/code")
            val connection = url.openConnection() as HttpURLConnection
            connection.requestMethod = "GET"
            connection.setRequestProperty("Content-Type", "application/json")
            connection.setRequestProperty("Accept", "application/json")
            connection.setRequestProperty("phone", phoneNumber)
            connection.doInput = true
            connection.doOutput = false

            val inputSystem = connection.inputStream
            val inputStreamReader = InputStreamReader(inputSystem, "UTF-8")
            val request: CodeRequest = Gson().fromJson(inputStreamReader, CodeRequest::class.java)

            if (!request.result) {
                userAlreadyVoted(request)
            }

            inputStreamReader.close()
            inputSystem.close()
        }
    }

    /**
     * Notify the user and return home if user already voted
     */
    private fun userAlreadyVoted(request: CodeRequest) {
        this.runOnUiThread {
            kotlin.run {
                Toast.makeText(applicationContext, request.message, 1000).show()
                startActivity(Intent(this, MainActivity::class.java))
            }
        }
    }
}