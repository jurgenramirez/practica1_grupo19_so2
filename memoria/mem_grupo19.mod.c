#include <linux/module.h>
#define INCLUDE_VERMAGIC
#include <linux/build-salt.h>
#include <linux/vermagic.h>
#include <linux/compiler.h>

BUILD_SALT;

MODULE_INFO(vermagic, VERMAGIC_STRING);
MODULE_INFO(name, KBUILD_MODNAME);

__visible struct module __this_module
__section(".gnu.linkonce.this_module") = {
	.name = KBUILD_MODNAME,
	.init = init_module,
#ifdef CONFIG_MODULE_UNLOAD
	.exit = cleanup_module,
#endif
	.arch = MODULE_ARCH_INIT,
};

#ifdef CONFIG_RETPOLINE
MODULE_INFO(retpoline, "Y");
#endif

static const struct modversion_info ____versions[]
__used __section("__versions") = {
	{ 0x19fdd0c3, "module_layout" },
	{ 0x5b5cdbab, "single_release" },
	{ 0x875ed21b, "seq_lseek" },
	{ 0x21a8cf08, "seq_read" },
	{ 0xe8d4e6f7, "remove_proc_entry" },
	{ 0xc5850110, "printk" },
	{ 0x86a7b10, "proc_create" },
	{ 0xc959d152, "__stack_chk_fail" },
	{ 0x51662721, "seq_printf" },
	{ 0x40c7247c, "si_meminfo" },
	{ 0xca211627, "single_open" },
	{ 0xbdfb6dbb, "__fentry__" },
};

MODULE_INFO(depends, "");


MODULE_INFO(srcversion, "377FA10C2A81F309C65F95F");
