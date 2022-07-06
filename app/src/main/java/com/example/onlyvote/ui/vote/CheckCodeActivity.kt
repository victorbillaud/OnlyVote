package com.example.onlyvote.ui.vote

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import com.example.onlyvote.MainActivity
import com.example.onlyvote.R
import com.example.onlyvote.data.CodeRequest
import com.google.gson.Gson
import java.io.InputStreamReader
import java.net.HttpURLConnection
import java.net.URL

/**
 * Check code class
 */
class CheckCodeActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_check_code)

        val phoneInfo: TextView = findViewById(R.id.textViewPhoneInfo)

        phoneInfo.setText("Veuillez entrer le code a 6 chiffres que vous avez reçu par SMS au " + intent.extras?.get("phone"))

        val voteInfo: TextView = findViewById(R.id.textViewVoteInfo)

        voteInfo.setText("Votre choix est " + intent.extras?.get("candidate"))

        val cancelVote: Button = findViewById(R.id.buttonCancelCode)

        cancelVote.setOnClickListener {
            val intentSendMessage = Intent(this, SendMessageActivity::class.java)
            intentSendMessage.putExtra("candidate", intent.extras?.get("candidate").toString())
            startActivity(intentSendMessage)
        }

        val checkButton: Button = findViewById(R.id.buttonValider)
        val editTextCode: EditText = findViewById(R.id.editTextCode)

        checkButton.setOnClickListener {
            checkCode(intent.extras?.get("phone").toString(), editTextCode.text.toString(), intent.extras?.get("idCandidate").toString()).start()

            startActivity(Intent(this, MainActivity::class.java))
        }
    }

    /**
     * Check code with phone number and send candidate id to api
     * @param phoneNumber
     * @param code
     * @param idCandidate
     */
    private fun checkCode(phoneNumber: String, code: String, idCandidate: String) : Thread {
        return Thread {
            val url = URL("https://onlyvote.victorbillaud.fr/check  ")
            val connection = url.openConnection() as HttpURLConnection
            connection.requestMethod = "GET"
            connection.setRequestProperty("Content-Type", "application/json")
            connection.setRequestProperty("Accept", "application/json")
            connection.setRequestProperty("phone", phoneNumber)
            connection.setRequestProperty("code", code)
            connection.setRequestProperty("idCandidat", idCandidate)
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
     * @param request
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