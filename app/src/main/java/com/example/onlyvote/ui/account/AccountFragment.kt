package com.example.onlyvote.ui.account

import android.content.res.ColorStateList
import android.graphics.Color
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.fragment.app.Fragment
import com.example.onlyvote.R
import com.example.onlyvote.data.CityRequest
import com.example.onlyvote.databinding.FragmentAccountBinding
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.google.gson.Gson
import java.net.HttpURLConnection
import java.net.URL
import org.json.JSONObject
import java.io.InputStreamReader
import java.io.OutputStreamWriter

/**
 * Account page class
 */
class AccountFragment : Fragment() {

    private var _binding: FragmentAccountBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentAccountBinding.inflate(inflater, container, false)
        val root: View = binding.root

        binding.apply {
            val data: ArrayList<Int> = ArrayList()

            for (i in 1..95) {
                data.add(i)
            }

            data.add(971)
            data.add(972)
            data.add(973)
            data.add(974)
            data.add(976)

            val adapter: ArrayAdapter<Int> = ArrayAdapter(binding.root.context, android.R.layout.simple_list_item_1, data)

            spinnerDptOfBirth.adapter = adapter

            /**
             * Fetch cities name on department new code selected
             */
            spinnerDptOfBirth.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
                override fun onItemSelected(p0: AdapterView<*>?, p1: View?, p2: Int, p3: Long) {
                    fetchCityData(JSONObject().put("department", spinnerDptOfBirth.selectedItem.toString())).start()
                }

                override fun onNothingSelected(p0: AdapterView<*>?) {}
            }

            /**
             * Show date picker on button click
             */
            buttonDate.setOnClickListener {
                val datePickerFragment = DatePickerFragment()
                val supportFragmentManager = requireActivity().supportFragmentManager

                supportFragmentManager.setFragmentResultListener(
                    "REQUEST_KEY",
                    viewLifecycleOwner
                ) { resultKey, bundle ->
                    if (resultKey == "REQUEST_KEY") {
                        val date = bundle.getString("SELECTED_DATE")
                        buttonDate.text = date
                    }
                }

                datePickerFragment.show(supportFragmentManager, "DatePickerFragment")
            }

            /**
             * Create then send user informations to api on button click
             */
            buttonRegister.setOnClickListener {
                if (checkAllFields()) {
                    val userInfo = JSONObject()
                        .put("firstname", editTextTextFirstName.text)
                        .put("lastname", editTextTextLastName.text)
                        .put("gender", if (radioButtonMale.isChecked) "Homme" else "Femme")
                        .put("birthDate", buttonDate.text)
                        .put("birthDepartment", spinnerDptOfBirth.selectedItem.toString())
                        .put("birthTown", spinnerCityOfBirth.selectedItem.toString())
                        .put("email", editTextTextEmailAddress.text)
                        .put("phoneNumber", editTextPhone.text)
                        .put("socialNumber", editTextNSS.text)

                    sendUser(userInfo).start()

                    root.rootView.findViewById<BottomNavigationView>(R.id.nav_view).selectedItemId = R.id.navigation_vote
                }
            }
        }

        return root
    }

    /**
     * Send user informations to api
     * @param data
     */
    private fun sendUser(data: JSONObject): Thread {
        return Thread {
            val url = URL("https://onlyvote.victorbillaud.fr/register")
            val connection = url.openConnection() as HttpURLConnection
            connection.requestMethod = "POST"
            connection.setRequestProperty("Content-Type", "application/json")

            val outputStreamWriter = OutputStreamWriter(connection.outputStream)
            outputStreamWriter.write(data.toString())
            outputStreamWriter.flush()

            connection.responseCode
        }
    }

    /**
     * Fetch all the departements code from api
     */
    /* private fun fetchDptsData(): Thread  {
        return Thread {
            val url = URL("https://geo.api.gouv.fr/departements?fields=nom,code")
            val connection = url.openConnection() as HttpURLConnection
            val inputSystem = connection.inputStream
            val inputStreamReader = InputStreamReader(inputSystem, "UTF-8")
            val request: Array<DptsRequest> = Gson().fromJson(inputStreamReader, Array<DptsRequest>::class.java)

            updateUiDpts(request)

            inputStreamReader.close()
            inputSystem.close()
        }
    } */

    /**
     * Fetch all cities name depending on department code from api
     * @param code
     */
    private fun fetchCityData(code: JSONObject): Thread {
        return Thread {
            val url = URL("https://onlyvote.victorbillaud.fr/department")
            val connection = url.openConnection() as HttpURLConnection
            connection.requestMethod = "POST"
            connection.setRequestProperty("Content-Type", "application/json")
            connection.setRequestProperty("Accept", "application/json")
            connection.doInput = true
            connection.doOutput = true

            val outputStreamWriter = OutputStreamWriter(connection.outputStream)
            outputStreamWriter.write(code.toString())
            outputStreamWriter.flush()

            val inputSystem = connection.inputStream
            val inputStreamReader = InputStreamReader(inputSystem, "UTF-8")
            val request: Array<CityRequest> = Gson().fromJson(inputStreamReader, Array<CityRequest>::class.java)

            updateUiCity(request)

            outputStreamWriter.close()
            inputStreamReader.close()
            inputSystem.close()
        }
    }

    /**
     * Update the UI on fetching departments code
     * @param request
     */
    /* private fun updateUiDpts(request: Array<DptsRequest>) {
        requireActivity().runOnUiThread {
            kotlin.run {
                val spinner: Spinner = binding.spinnerDptOfBirth
                val data: ArrayList<String> = ArrayList()

                for (dpts in request) {
                    data.add(dpts.code)
                }

                val adapter: ArrayAdapter<String> = ArrayAdapter(binding.root.context, android.R.layout.simple_list_item_1, data)

                spinner.adapter = adapter
            }
        }
    } */

    /**
     * Update the UI on fetching cities names
     * @param request
     */
    private fun updateUiCity(request: Array<CityRequest>) {
        requireActivity().runOnUiThread {
            kotlin.run {
                val spinner: Spinner = binding.spinnerCityOfBirth
                val data: ArrayList<String> = ArrayList()

                for (city in request) {
                    data.add(city.nccenr)
                }

                val adapter: ArrayAdapter<String> = ArrayAdapter(binding.root.context, android.R.layout.simple_list_item_1, data)

                spinner.adapter = adapter
            }
        }
    }

    /**
     * Check all fields depending on type
     */
    private fun checkAllFields(): Boolean {
        binding.apply {
            if (editTextTextFirstName.length() == 0) {
                editTextTextFirstName.backgroundTintList = ColorStateList.valueOf(Color.parseColor("#e1000f"))
                return false
            }

            if (editTextTextLastName.length() == 0) {
                editTextTextLastName.backgroundTintList = ColorStateList.valueOf(Color.parseColor("#e1000f"))
                return false
            }

            if (!editTextTextEmailAddress.text.matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}\$".toRegex())) {
                editTextTextEmailAddress.backgroundTintList = ColorStateList.valueOf(Color.parseColor("#e1000f"))
                return false
            }

            if (editTextPhone.length() != 10) {
                editTextPhone.backgroundTintList = ColorStateList.valueOf(Color.parseColor("#e1000f"))
                return false
            }

            if (editTextNSS.length() != 15) {
                editTextNSS.backgroundTintList = ColorStateList.valueOf(Color.parseColor("#e1000f"))
                return false
            }

            return true
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}