package com.example.onlyvote.ui.candidates

import android.text.method.ScrollingMovementMethod
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.onlyvote.R

class VPAdapter constructor(viewPagerItemArrayList: ArrayList<ViewPagerItem>) : RecyclerView.Adapter<VPAdapter.ViewHolder>() {

    val viewPagerItemArrayList: ArrayList<ViewPagerItem>

    init {
        this.viewPagerItemArrayList = viewPagerItemArrayList
    }

    class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val name: TextView = itemView.findViewById(R.id.textViewName)
        val party: TextView = itemView.findViewById(R.id.textViewParty)
        val program: TextView = itemView.findViewById(R.id.textViewProgram)
        var profile: ImageView = itemView.findViewById(R.id.imageViewProfile)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view: View = LayoutInflater.from(parent.context)
            .inflate(R.layout.viewpager_item, parent, false)

        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val viewPagerItem: ViewPagerItem = viewPagerItemArrayList.get(position)

        holder.name.setText(viewPagerItem.name)
        holder.party.setText(viewPagerItem.party)
        holder.program.setText(viewPagerItem.program)
        holder.program.movementMethod = ScrollingMovementMethod.getInstance()
        Glide.with(holder.itemView).load(viewPagerItem.profile).into(holder.profile)
    }

    override fun getItemCount(): Int {
        return this.viewPagerItemArrayList.size
    }
}