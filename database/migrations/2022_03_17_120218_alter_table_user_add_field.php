<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableUserAddField extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('users',function(Blueprint $table) {
            $table->string("surname")->nullable()->after("name");
            $table->string("phone")->nullable()->after("surname");
            $table->string("company")->nullable()->after("phone");
            $table->text("address")->nullable()->after("company");
            $table->string("photo")->nullable()->after("address");
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
        Schema::table('users',function(Blueprint $table) {
            $table->dropColumn("surname");
            $table->dropColumn("phone");
            $table->dropColumn("company");
            $table->dropColumn("address");
            $table->dropColumn("photo");
        });
    }
}
