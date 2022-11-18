<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateEvenimentsTableType extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('eveniments', function (Blueprint $table) {
            $table->boolean('closed')->default(false);
            $table->float('lat')->default(0.0);
            $table->float('long')->default(0.0);
            $table->integer('type')->default(0);
            $table->integer('participants')->default(2);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
