package com.example.onlyvote.ui.account

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Spinner
import androidx.fragment.app.Fragment
import com.example.onlyvote.R
import com.example.onlyvote.data.CityRequest
import com.example.onlyvote.databinding.FragmentAccountBinding
import com.google.gson.Gson
import java.io.InputStreamReader
import java.net.HttpURLConnection
import java.net.URL
import com.example.onlyvote.data.DptsRequest

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

        fetchDptsData().start()

        fetchCityData("01").start()

        val spinner = root.findViewById<Spinner>(R.id.spinnerDptOfBirth)

        spinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(p0: AdapterView<*>?, p1: View?, p2: Int, p3: Long) {
                fetchCityData(spinner.selectedItem.toString()).start()
            }

            override fun onNothingSelected(p0: AdapterView<*>?) {

            }

        }

        binding.apply {
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
        }

        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    private fun fetchDptsData(): Thread  {
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
    }

    private fun fetchCityData(code: String): Thread {
        return Thread {
            val url = URL("https://geo.api.gouv.fr/departements/" + code + "/communes?fields=nom&format=json&geometry=centre")
            val connection = url.openConnection() as HttpURLConnection
            val inputSystem = connection.inputStream
            val inputStreamReader = InputStreamReader(inputSystem, "UTF-8")
            val request: Array<CityRequest> = Gson().fromJson(inputStreamReader, Array<CityRequest>::class.java)

            updateUiCity(request)

            inputStreamReader.close()
            inputSystem.close()
        }
    }

    private fun updateUiDpts(request: Array<DptsRequest>) {
        activity?.runOnUiThread {
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
    }

    private fun updateUiCity(request: Array<CityRequest>) {
        activity?.runOnUiThread {
            kotlin.run {
                val spinner: Spinner = binding.spinnerCityOfBirth
                val data: ArrayList<String> = ArrayList()

                for (city in request) {
                    data.add(city.nom)
                }

                val adapter: ArrayAdapter<String> = ArrayAdapter(binding.root.context, android.R.layout.simple_list_item_1, data)

                spinner.adapter = adapter
            }
        }
    }
}