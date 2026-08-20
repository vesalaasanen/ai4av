---
spec_id: admin/control4-ms-series-switch
schema_version: ai4av-public-spec-v1
revision: 1
title: "Control4 MS Series Switch Control Spec"
manufacturer: Control4
model_family: MS-1212
aliases: []
compatible_with:
  manufacturers:
    - Control4
  models:
    - MS-1212
    - MS-2424
    - MS-2400
    - MS-2416
    - MS-4424
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.control4.com
source_urls:
  - https://docs.control4.com/docs/product/ms-series-pakedge-cloud-managed-switches/all-dealer-command-line-interface-guide/english/latest/ms-series-pakedge-cloud-managed-switches-command-line-interface-guide-rev-b.pdf
  - https://docs.control4.com/docs/product/ms-series-pakedge-cloud-managed-switches/user-guide/english/revision/A/ms-series-pakedge-cloud-managed-switches-user-guide-rev-a.pdf
  - https://docs.control4.com/
retrieved_at: 2026-08-11T05:54:59.928Z
last_checked_at: 2026-08-19T09:13:02.499Z
generated_at: 2026-08-19T09:13:02.499Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no shutdown"
  - "no shutdown all"
  - "ip routing"
  - "ip pim sparse"
  - "ip pim dr-priority"
  - "ip pim hello-interval"
  - "ip pim join-prune-interval"
  - "ip pim rp-candidate"
  - "ip pim bsr-border"
  - "ip igmp"
  - "ip igmp last-member-query-interval"
  - "ip igmp query-interval"
  - "firmware version compatibility not stated in source (show version reports a runtime version string per unit, no compatibility matrix)."
  - "SSH TCP port not stated in source (only Telnet port 23 is explicit)."
  - "OvrC cloud / SNMP are documented management surfaces but their wire protocol is out of scope for this CLI guide."
  - "the source exposes many additional observable fields via show commands (CPU utilization, event log, port counters, STP state, PoE budget, VLAN tables, etc.); only a representative subset is enumerated above. Response payload schemas are not formally specified in the source."
  - "trap payload format and OID bindings are not specified in this CLI guide; the source only documents enable/disable configuration (snmp-server enable traps ...)."
  - "no canned macro sequences defined in source; scripts are operator-authored."
  - "no electrical/voltage/current specifications in this document (it is a CLI guide, not a hardware datasheet)."
  - "no fault-recovery or error-handling sequences specified in source."
  - "protocol/CLI version number not stated as a compatibility range in source."
  - "binary/byte-level encoding N/A — this is an ASCII text CLI; no hex command tables in source."
verification:
  verdict: verified
  checked_at: 2026-08-19T09:13:02.499Z
  matched_actions: 761
  action_count: 761
  confidence: medium
  summary: "All 761 spec actions have a whitespace-collapsed literal match against source Format lines; transport (port 23, 115200-8-N-1, password) verified. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-11
---

# Control4 MS Series Switch Control Spec

## Summary
Control4 MS Series (Pakedge OEM) Layer 2/3 managed Ethernet switches — models MS-1212, MS-2424, MS-2400, MS-2416, MS-4424 — managed via a text Command Line Interface (CLI) reachable over TCP (Telnet port 23, SSH), the RS-232 DCE console port, and OvrC cloud management. This spec covers the CLI command surface documented in the vendor *Command Line Interface Guide*. The switch is a network infrastructure device rather than a traditional AV transport device; the CLI is its primary machine control interface.

<!-- UNRESOLVED: firmware version compatibility not stated in source (show version reports a runtime version string per unit, no compatibility matrix). -->
<!-- UNRESOLVED: SSH TCP port not stated in source (only Telnet port 23 is explicit). -->
<!-- UNRESOLVED: OvrC cloud / SNMP are documented management surfaces but their wire protocol is out of scope for this CLI guide. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: password
```

Port 23 is the Telnet listener (source section 1.3). Serial parameters are the console-port settings (source section 1.2). Auth is password-based: CLI login requires a user account (`username`/`passwd`, `enable passwd`); AAA may delegate authentication to RADIUS or TACACS+ (source sections 3.9, 3.11, 3.12, 3.13). SSH is supported (`ip ssh`) but its port is not stated.

## Traits
```yaml
traits:
  - queryable
```

Queryable: the source documents a large catalogue of `show` status/statistics commands. No AV-style power or A/V input-output routing traits apply; the device is an Ethernet switch with port/VLAN/L3 routing configured via CLI.

## Actions
```yaml
- id: show_process_cpu
  label: "Show Process Cpu"
  kind: query
  command: "show process cpu"

- id: show_process_cpu_2
  label: "Show Process Cpu"
  kind: query
  command: "show process cpu"

- id: show_eventlog
  label: "Show Eventlog"
  kind: query
  command: "show eventlog"

- id: show_running_config_scriptname_all_interface
  label: "Show Running-Config [<Scriptname> | All"
  kind: query
  command: "show running-config [<scriptname> | all | interface {<slot/port> |lag<lag-id> | vlan <vlan-id>}] Default None"

- id: show_sysinfo
  label: "Show Sysinfo"
  kind: query
  command: "show sysinfo"

- id: show_tech_support_dot1q_dot1s_dot3ad
  label: "Show Tech-Support [{Dot1Q | Dot1S"
  kind: query
  command: "show tech-support [{dot1q | dot1s | dot3ad | layer3 | linkdependency | lldp | log | qos |routing | sim | switching | system} [file] | file ]"

- id: show_hardware
  label: "Show Hardware"
  kind: query
  command: "show hardware"

- id: show_version
  label: "Show Version"
  kind: query
  command: "show version"

- id: show_loginsession_long
  label: "Show Loginsession [Long]"
  kind: query
  command: "show loginsession [long]"

- id: show_command_begin_keyword_exclude_keyword
  label: "Show Command | {[Begin <Keyword>]"
  kind: query
  command: "show command | {[begin <keyword>] [exclude <keyword>] [include <keyword>][section <starting keyword> [ending keyword]] }"

- id: network_parms_ipaddr_netmask_gateway_none
  label: "Network Parms { Ipaddr Netmask"
  kind: action
  command: "network parms { ipaddr netmask [ gateway ]| none} Mode Privileged EXEC"

- id: network_protocol_none_bootp_dhcp_privileged
  label: "Network Protocol {None | Bootp"
  kind: action
  command: "network protocol {none | bootp | dhcp} Mode Privileged EXEC"

- id: network_protocol_dhcp_client_id_global
  label: "Network Protocol Dhcp [Client-Id] Mode"
  kind: action
  command: "network protocol dhcp [client-id] Mode Global"

- id: network_mac_address_macaddr
  label: "Network Mac-Address Macaddr"
  kind: action
  command: "network mac-address macaddr"

- id: network_mac_type_local_burnedin_privileged
  label: "Network Mac-Type {Local | Burnedin}"
  kind: action
  command: "network mac-type {local | burnedin} Mode Privileged EXEC"

- id: network_mac_type_privileged_exec
  label: "No Network Mac-Type Mode Privileged"
  kind: action
  command: "no network mac-type Mode Privileged EXEC"

- id: show_network
  label: "Show Network"
  kind: query
  command: "show network"

- id: show_interfaces_status_slot_port_all
  label: "Show Interfaces Status [{<Slot/Port> |All"
  kind: query
  command: "show interfaces status [{<slot/port> |all |lag <lag-id> | vlan <vlan-id>}]"

- id: show_interface_counters
  label: "Show Interface Counters"
  kind: query
  command: "show interface counters"

- id: show_interface_dampening
  label: "Show Interface Dampening"
  kind: query
  command: "show interface dampening"

- id: show_interface_lag_lag_intf_num
  label: "Show Interface Lag Lag-Intf-Num"
  kind: query
  command: "show interface lag lag-intf-num"

- id: show_interfaces_switch
  label: "Show Interfaces Switch"
  kind: query
  command: "show interfaces switch"

- id: show_port_intf_range_all
  label: "Show Port {Intf-Range | All}"
  kind: query
  command: "show port {intf-range | all}"

- id: show_port_advertise_unit_slot_port
  label: "Show Port Advertise [ Unit/Slot/Port]"
  kind: query
  command: "show port advertise [ unit/slot/port]"

- id: show_port_description_slot_port_port
  label: "Show Port Description {Slot/Port |"
  kind: query
  command: "show port description {slot/port | port-channel <portchannel-id>}"

- id: interface_slot_port_lag_1_6
  label: "Interface {<Slot/Port> | Lag <1-6>"
  kind: action
  command: "interface {<slot/port> | lag <1-6> | range <intf-range>| vlan <1-4093> }"

- id: description_description
  label: "Description <Description>"
  kind: action
  command: "description <description>"

- id: description
  label: "No Description"
  kind: action
  command: "no description"

- id: flowcontrol
  label: "Flowcontrol"
  kind: action
  command: "flowcontrol"

- id: flowcontrol_2
  label: "No Flowcontrol"
  kind: action
  command: "no flowcontrol"

- id: mtu_1518_9198
  label: "Mtu 1518-9198"
  kind: action
  command: "mtu 1518-9198"

- id: mtu
  label: "No Mtu"
  kind: action
  command: "no mtu"

- id: auto_negotiate
  label: "Auto-Negotiate"
  kind: action
  command: "auto-negotiate"

- id: auto_negotiate_interface_config
  label: "No Auto-Negotiate Mode Interface Config"
  kind: action
  command: "no auto-negotiate Mode Interface Config"

- id: auto_negotiate_all_global_config
  label: "Auto-Negotiate All Mode Global Config"
  kind: action
  command: "auto-negotiate all Mode Global Config"

- id: auto_negotiate_all
  label: "No Auto-Negotiate All"
  kind: action
  command: "no auto-negotiate all"

- id: speed_auto_10_100_1000_10g
  label: "Speed Auto {10|100|1000|10G} [Half-Duplex|Full-Duplex]"
  kind: action
  command: "speed auto {10|100|1000|10G} [half-duplex|full-duplex]"

- id: speed_duplex_all_10_100_full
  label: "Speed-Duplex All {10 | 100}"
  kind: action
  command: "speed-duplex all {10 | 100} { full-duplex | half-duplex }"

- id: show_mac_addr_table_macaddr_vlan
  label: "Show Mac-Addr-Table [{<Macaddr> <Vlan-Id>}]"
  kind: query
  command: "show mac-addr-table [{<macaddr> <vlan-id>}]"

- id: show_mac_addr_table_count
  label: "Show Mac-Addr-Table Count"
  kind: query
  command: "show mac-addr-table count"

- id: show_mac_addr_table_interface_slot
  label: "Show Mac-Addr-Table Interface {<Slot/Port> |"
  kind: query
  command: "show mac-addr-table interface {<slot/port> | port-channel <portchannel-id> | vlan <vlan-id>}"

- id: show_mac_address_table_igmpsnooping
  label: "Show Mac-Address-Table Igmpsnooping"
  kind: query
  command: "show mac-address-table igmpsnooping"

- id: show_mac_address_table_multicast_macaddr
  label: "Show Mac-Address-Table Multicast [{<Macaddr> <Vlan-Id>]]"
  kind: query
  command: "show mac-address-table multicast [{<macaddr> <vlan-id>]]"

- id: show_mac_address_table_stats
  label: "Show Mac-Address-Table Stats"
  kind: query
  command: "show mac-address-table stats"

- id: show_forwardingdb_agetime
  label: "Show Forwardingdb Agetime"
  kind: query
  command: "show forwardingdb agetime"

- id: bridge_aging_time_10_1000000
  label: "Bridge Aging-Time <10-1000000>"
  kind: action
  command: "bridge aging-time <10-1000000>"

- id: bridge_aging_time
  label: "No Bridge Aging-Time"
  kind: action
  command: "no bridge aging-time"

- id: vlan_database
  label: "Vlan Database"
  kind: action
  command: "vlan database"

- id: vlan_vlan_list
  label: "Vlan <Vlan-List>"
  kind: action
  command: "vlan <vlan-list>"

- id: vlan_vlan_list_2
  label: "No Vlan <Vlan-List>"
  kind: action
  command: "no vlan <vlan-list>"

- id: vlan_name_1_4093_newname
  label: "Vlan Name <1-4093> <Newname>"
  kind: action
  command: "vlan name <1-4093> <newname>"

- id: vlan_name_1_4093
  label: "No Vlan Name <1-4093>"
  kind: action
  command: "no vlan name <1-4093>"

- id: show_vlan
  label: "Show Vlan"
  kind: query
  command: "show vlan"

- id: show_vlan_id_1_4093_name
  label: "Show Vlan {Id <1-4093> |"
  kind: query
  command: "show vlan {id <1-4093> | name <vlanname>}"

- id: show_vlan_internal_usage
  label: "Show Vlan Internal Usage"
  kind: query
  command: "show vlan internal usage"

- id: show_interface_switchport_slot_port_port
  label: "Show Interface Switchport {<Slot/Port> |"
  kind: query
  command: "show interface switchport {<slot/port> | port-channel <1-64>}"

- id: switchport_private_vlan_host_association_primary
  label: "Switchport Private-Vlan {Host-Association <Primary-Vlan-Id> <Secondary-Vlan-Id>"
  kind: action
  command: "switchport private-vlan {host-association <primary-vlan-id> <secondary-vlan-id> | mapping <primary-vlan-id> [add | remove] <secondary-vlan-list>}"

- id: switchport_private_vlan_host_association_mapping
  label: "No Switchport Private-Vlan {Host-Association|Mapping}"
  kind: action
  command: "no switchport private-vlan {host-association|mapping}"

- id: switchport_private_vlan_host_promiscuous
  label: "Switchport Mode Private-Vlan {Host|Promiscuous}"
  kind: action
  command: "switchport mode private-vlan {host|promiscuous}"

- id: switchport_private_vlan
  label: "No Switchport Mode Private-Vlan"
  kind: action
  command: "no switchport mode private-vlan"

- id: private_vlan_association_add_remove_secondary
  label: "Private-Vlan {Association [Add|Remove] <Secondary-Vlanlist> |"
  kind: action
  command: "private-vlan {association [add|remove] <secondary-vlanlist> | community | isolated | primary}"

- id: private_vlan_association
  label: "No Private-Vlan [Association]"
  kind: action
  command: "no private-vlan [association]"

- id: switchport_access
  label: "Switchport Mode Access"
  kind: action
  command: "switchport mode access"

- id: switchport_access_2
  label: "No Switchport Mode Access"
  kind: action
  command: "no switchport mode access"

- id: switchport_trunk_allowed_vlan_vlan_list
  label: "Switchport Trunk Allowed Vlan {<Vlan-List>"
  kind: action
  command: "switchport trunk allowed vlan {<vlan-list> | all | add <vlan-list> | remove <vlan-list> | except <vlan-list>}"

- id: switchport_trunk_allowed_vlan
  label: "No Switchport Trunk Allowed Vlan"
  kind: action
  command: "no switchport trunk allowed vlan"

- id: switchport_trunk_native_vlan_vlan_id
  label: "Switchport Trunk Native Vlan <Vlan-Id>"
  kind: action
  command: "switchport trunk native vlan <vlan-id>"

- id: switchport_trunk_native_vlan
  label: "No Switchport Trunk Native Vlan"
  kind: action
  command: "no switchport trunk native vlan"

- id: switchport_access_vlan_vlan_id
  label: "Switchport Access Vlan <Vlan-Id>"
  kind: action
  command: "switchport access vlan <vlan-id>"

- id: switchport_access_vlan
  label: "No Switchport Access Vlan"
  kind: action
  command: "no switchport access vlan"

- id: show_interfaces_switchport_slot_port_port
  label: "Show Interfaces Switchport [<Slot/Port> |"
  kind: query
  command: "show interfaces switchport [<slot/port> | port-channel <trunk-id>]"

- id: set_igmp
  label: "Set Igmp"
  kind: action
  command: "set igmp"

- id: set_igmp_2
  label: "No Set Igmp"
  kind: action
  command: "no set igmp"

- id: clear_igmpsnooping
  label: "Clear Igmpsnooping"
  kind: action
  command: "clear igmpsnooping"

- id: set_igmp_fast_leave_vlan_id
  label: "Set Igmp Fast-Leave <Vlan Id>"
  kind: action
  command: "set igmp fast-leave <vlan id>"

- id: set_igmp_groupmembership_interval_vlan_id
  label: "Set Igmp Groupmembership-Interval <Vlan Id>"
  kind: action
  command: "set igmp groupmembership-interval <vlan id> <2-3600>"

- id: set_igmp_mcrtrexpiretime_vlan_id_0
  label: "Set Igmp Mcrtrexpiretime <Vlan Id>"
  kind: action
  command: "set igmp mcrtrexpiretime <vlan id> <0-3600>"

- id: set_igmp_mcrtrexpiretime
  label: "No Set Igmp Mcrtrexpiretime"
  kind: action
  command: "no set igmp mcrtrexpiretime"

- id: set_igmp_mrouter_vlan_id
  label: "Set Igmp Mrouter {<Vlan-Id>}"
  kind: action
  command: "set igmp mrouter {<vlan-id>}"

- id: ip_igmp_snooping_mrouter_vlan_id
  label: "No Ip Igmp Snooping Mrouter"
  kind: action
  command: "no ip igmp snooping mrouter { <vlan-id>}"

- id: set_igmp_maxresponse_vlan_id_1
  label: "Set Igmp Maxresponse <Vlan-Id> <1-25>"
  kind: action
  command: "set igmp maxresponse <vlan-id> <1-25>"

- id: set_igmp_maxresponse_vlan_id
  label: "No Set Igmp Maxresponse <Vlan-Id>"
  kind: action
  command: "no set igmp maxresponse <vlan-id>"

- id: set_igmp_report_suppression_vlan_id
  label: "Set Igmp Report-Suppression <Vlan-Id>"
  kind: action
  command: "set igmp report-suppression <vlan-id>"

- id: set_igmp_report_suppression_vlan_id_2
  label: "No Set Igmp Report-Suppression <Vlan-Id>"
  kind: action
  command: "no set igmp report-suppression <vlan-id>"

- id: show_ip_igmp_snooping_vlan_vlan
  label: "Show Ip Igmp Snooping [Vlan"
  kind: query
  command: "show ip igmp snooping [vlan <vlan-id>]"

- id: show_ip_igmp_snooping_mrouter_vlan
  label: "Show Ip Igmp Snooping Mrouter"
  kind: query
  command: "show ip igmp snooping mrouter vlan {[interface] <slot/port> | vlan-id>}"

- id: show_mac_address_table_igmpsnooping_2
  label: "Show Mac-Address-Table Igmpsnooping"
  kind: query
  command: "show mac-address-table igmpsnooping"

- id: set_igmp_querier_vlan_id
  label: "Set Igmp Querier [Vlan Id]"
  kind: action
  command: "set igmp querier [vlan id]"

- id: set_igmp_querier_vlan_id_2
  label: "No Set Igmp Querier <Vlan"
  kind: action
  command: "no set igmp querier <vlan id>"

- id: set_igmp_querier_vlan_id_address
  label: "No Set Igmp Querier <Vlan"
  kind: action
  command: "no set igmp querier <vlan id> address"

- id: set_igmp_querier_query_interval_1
  label: "Set Igmp Querier Query-Interval <1-1800>"
  kind: action
  command: "set igmp querier query-interval <1-1800>"

- id: set_igmp_querier_query_interval_global
  label: "No Set Igmp Querier Query-Interval"
  kind: action
  command: "no set igmp querier query-interval Mode Global Config"

- id: set_igmp_querier_timer_expiry_60
  label: "Set Igmp Querier Timer Expiry"
  kind: action
  command: "set igmp querier timer expiry <60-300>"

- id: set_igmp_querier_timer_expiry
  label: "No Set Igmp Querier Timer"
  kind: action
  command: "no set igmp querier timer expiry"

- id: set_igmp_querier_version_1_3
  label: "Set Igmp Querier Version <1-3>"
  kind: action
  command: "set igmp querier version <1-3>"

- id: set_igmp_querier_version
  label: "No Set Igmp Querier Version"
  kind: action
  command: "no set igmp querier version"

- id: set_igmp_querier_election_participate_vlan
  label: "Set Igmp Querier Election Participate"
  kind: action
  command: "set igmp querier election participate <vlan-id>"

- id: ip_igmp_snooping_querier_vlan_election
  label: "No Ip Igmp Snooping Querier"
  kind: action
  command: "no ip igmp snooping querier vlan election participate <vlan-id>"

- id: show_igmpsnooping_querier
  label: "Show Igmpsnooping Querier"
  kind: query
  command: "show igmpsnooping querier"

- id: show_igmpsnooping_querier_vlan_vlan_id
  label: "Show Igmpsnooping Querier Vlan <Vlan-Id>"
  kind: query
  command: "show igmpsnooping querier vlan <vlan-id>"

- id: show_igmpsnooping_querier_detail
  label: "Show Igmpsnooping Querier Detail"
  kind: query
  command: "show igmpsnooping querier detail"

- id: show_ipv6_mldsnooping_interface_vlan_vlan
  label: "Show Ipv6 Mldsnooping [Interface {"
  kind: query
  command: "show ipv6 mldsnooping [interface { vlan <vlan-id>]"

- id: show_ipv6_mld_snooping_mrouter_vlan
  label: "Show Ipv6 Mld Snooping Mrouter"
  kind: query
  command: "show ipv6 mld snooping mrouter vlan {interface <slot/port>}"

- id: show_mac_address_table_mldsnooping
  label: "Show Mac-Address-Table Mldsnooping"
  kind: query
  command: "show mac-address-table mldsnooping"

- id: set_mld_vlan_id
  label: "Set Mld <Vlan Id>"
  kind: action
  command: "set mld <vlan id>"

- id: set_mld_vlan_id_2
  label: "No Set Mld <Vlan Id>"
  kind: action
  command: "no set mld <vlan id>"

- id: clear_mldsnooping
  label: "Clear Mldsnooping"
  kind: action
  command: "clear mldsnooping"

- id: set_mld_fast_leave_vlan_id
  label: "Set Mld Fast-Leave <Vlan Id>"
  kind: action
  command: "set mld fast-leave <vlan id>"

- id: set_mld_fast_leave_vlan_id_2
  label: "No Set Mld Fast-Leave <Vlan"
  kind: action
  command: "no set mld fast-leave <vlan id>"

- id: set_mld_groupmembership_interval_vlan_id
  label: "Set Mld Groupmembership-Interval <Vlan Id>"
  kind: action
  command: "set mld groupmembership-interval <vlan id> <2-3600>"

- id: set_mld_groupmember_shipinterval_vlan_id
  label: "No Set Mld Groupmember-Shipinterval <Vlan"
  kind: action
  command: "no set mld groupmember-shipinterval <vlan id>"

- id: set_mld_mcrtrexpiretime_vlan_id_0
  label: "Set Mld Mcrtrexpiretime <Vlan Id>"
  kind: action
  command: "set mld mcrtrexpiretime <vlan id> <0-3600>"

- id: set_mld_mcrtrexpiretime_vlan_id
  label: "No Set Mld Mcrtrexpiretime <Vlan"
  kind: action
  command: "no set mld mcrtrexpiretime <vlan id>"

- id: set_mld_mrouter_vlan_id
  label: "Set Mld Mrouter <Vlan-Id>"
  kind: action
  command: "set mld mrouter <vlan-id>"

- id: set_mld_mrouter_vlan_id_2
  label: "No Set Mld Mrouter <Vlan-Id>"
  kind: action
  command: "no set mld mrouter <vlan-id>"

- id: set_mld_max_response_time_vlan
  label: "No Set Mld Max-Response-Time <Vlan-Id>"
  kind: action
  command: "no set mld max-response-time <vlan-id>"

- id: show_mldsnooping_querier
  label: "Show Mldsnooping Querier"
  kind: query
  command: "show mldsnooping querier"

- id: show_mldsnooping_querier_vlan_vlan_id
  label: "Show Mldsnooping Querier Vlan <Vlan-Id>"
  kind: query
  command: "show mldsnooping querier vlan <vlan-id>"

- id: show_mldsnooping_querier_detail
  label: "Show Mldsnooping Querier Detail"
  kind: query
  command: "show mldsnooping querier detail"

- id: set_mld_querier_vlan_id
  label: "Set Mld Querier <Vlan Id>"
  kind: action
  command: "set mld querier <vlan id>"

- id: set_mld_querier_vlan_id_2
  label: "No Set Mld Querier <Vlan"
  kind: action
  command: "no set mld querier <vlan id>"

- id: set_mld_querier_vlan_id_address
  label: "Set Mld Querier <Vlan Id>"
  kind: action
  command: "set mld querier <vlan id> address <ipv6-address>"

- id: set_mld_querier_vlan_id_address_2
  label: "No Set Mld Querier <Vlan"
  kind: action
  command: "no set mld querier <vlan id> address"

- id: set_mld_querier_querier_interval_1
  label: "Set Mld Querier Querier-Interval <1-1800>"
  kind: action
  command: "set mld querier querier-interval <1-1800>"

- id: set_mld_querier_querier_interval
  label: "No Set Mld Querier Querier-Interval"
  kind: action
  command: "no set mld querier querier-interval"

- id: set_mld_querier_timer_expiry_60
  label: "Set Mld Querier Timer Expiry"
  kind: action
  command: "set mld querier timer expiry <60-300>"

- id: set_mld_querier_timer_expiry
  label: "No Set Mld Querier Timer"
  kind: action
  command: "no set mld querier timer expiry"

- id: set_mld_querier_election_participate_vlan
  label: "Set Mld Querier Election Participate"
  kind: action
  command: "set mld querier election participate <vlan-id>"

- id: set_mld_querier_election_participate_vlan_2
  label: "No Set Mld Querier Election"
  kind: action
  command: "no set mld querier election participate <vlan-id>"

- id: port_channel_name
  label: "Port-Channel Name"
  kind: action
  command: "port-channel name"

- id: addport_logical_slot_port
  label: "Addport Logical Slot/Port"
  kind: action
  command: "addport logical slot/port"

- id: deleteport_logical_slot_port
  label: "Deleteport Logical Slot/Port"
  kind: action
  command: "deleteport logical slot/port"

- id: deleteport_logical_slot_port_all
  label: "Deleteport { Logical Slot/Port |"
  kind: action
  command: "deleteport { logical slot/port | all}"

- id: lacp_actor_admin_state_longtimeout
  label: "Lacp Actor Admin State Longtimeout"
  kind: action
  command: "lacp actor admin state longtimeout"

- id: lacp_actor_admin_state_longtimeout_2
  label: "No Lacp Actor Admin State"
  kind: action
  command: "no lacp actor admin state longtimeout"

- id: lacp_actor_admin_state_passive
  label: "Lacp Actor Admin State Passive"
  kind: action
  command: "lacp actor admin state passive"

- id: lacp_actor_admin_state_passive_2
  label: "No Lacp Actor Admin State"
  kind: action
  command: "no lacp actor admin state passive"

- id: lacp_actor_port_priority_0_65535
  label: "Lacp Actor Port Priority 0-65535"
  kind: action
  command: "lacp actor port priority 0-65535"

- id: lacp_actor_port_priority
  label: "No Lacp Actor Port Priority"
  kind: action
  command: "no lacp actor port priority"

- id: interface_lag_lag_interface_number
  label: "Interface Lag Lag-Interface-Number"
  kind: action
  command: "interface lag lag-interface-number"

- id: port_lacpmode
  label: "Port Lacpmode"
  kind: action
  command: "port lacpmode"

- id: port_lacpmode_2
  label: "No Port Lacpmode"
  kind: action
  command: "no port lacpmode"

- id: port_lacpmode_enable_all
  label: "Port Lacpmode Enable All"
  kind: action
  command: "port lacpmode enable all"

- id: port_lacpmode_enable_all_2
  label: "No Port Lacpmode Enable All"
  kind: action
  command: "no port lacpmode enable all"

- id: port_lacptimeout_actor_partner_long_short
  label: "Port Lacptimeout {Actor | Partner}"
  kind: action
  command: "port lacptimeout {actor | partner} {long | short}"

- id: port_lacptimeout_actor_partner
  label: "No Port Lacptimeout {Actor |"
  kind: action
  command: "no port lacptimeout {actor | partner}"

- id: port_lacptimeout_actor_partner_long_short_2
  label: "Port Lacptimeout {Actor | Partner}"
  kind: action
  command: "port lacptimeout {actor | partner} {long | short}"

- id: port_lacptimeout_actor_partner_2
  label: "No Port Lacptimeout {Actor |"
  kind: action
  command: "no port lacptimeout {actor | partner}"

- id: port_channel_adminmode_all
  label: "Port-Channel Adminmode All"
  kind: action
  command: "port-channel adminmode all"

- id: port_channel_adminmode_all_2
  label: "No Port-Channel Adminmode All"
  kind: action
  command: "no port-channel adminmode all"

- id: port_channel_linktrap_logical_slot_port
  label: "Port-Channel Linktrap { Logical Slot/Port"
  kind: action
  command: "port-channel linktrap { logical slot/port | lag | all}"

- id: port_channel_linktrap_logical_slot_port_2
  label: "No Port-Channel Linktrap { Logical"
  kind: action
  command: "no port-channel linktrap { logical slot/port | lag | all}"

- id: port_channel_load_balance_1_2
  label: "Port-Channel Load-Balance {1 | 2"
  kind: action
  command: "port-channel load-balance {1 | 2 | 3 | 4 | 5 | 6 } { slot/port | all}"

- id: port_channel_load_balance_slot_port
  label: "No Port-Channel Load-Balance { Slot/Port"
  kind: action
  command: "no port-channel load-balance { slot/port | all}"

- id: port_channel_name_logical_slot_port
  label: "Port-Channel Name { Logical Slot/Port"
  kind: action
  command: "port-channel name { logical slot/port } name"

- id: port_channel_system_priority_priority
  label: "Port-Channel System Priority Priority"
  kind: action
  command: "port-channel system priority priority"

- id: port_channel_system_priority
  label: "No Port-Channel System Priority"
  kind: action
  command: "no port-channel system priority"

- id: show_lacp_actor_slot_port_all
  label: "Show Lacp Actor { Slot/Port"
  kind: query
  command: "show lacp actor { slot/port |all}"

- id: show_lacp_actor_slot_port_all_2
  label: "Show Lacp Actor { Slot/Port"
  kind: query
  command: "show lacp actor { slot/port | all}"

- id: show_port_channel_brief
  label: "Show Port-Channel Brief"
  kind: query
  command: "show port-channel brief"

- id: show_port_channel_slot_port_all
  label: "Show Port-Channel {Slot/Port | All}"
  kind: query
  command: "show port-channel {slot/port | all}"

- id: show_port_channel_system_priority
  label: "Show Port-Channel System Priority"
  kind: query
  command: "show port-channel system priority"

- id: show_port_channel_slot_port_counters
  label: "Show Port-Channel Slot/Port Counters"
  kind: query
  command: "show port-channel slot/port counters"

- id: clear_port_channel_lag_intf_num
  label: "Clear Port-Channel {Lag-Intf-Num | Slot/Port}"
  kind: action
  command: "clear port-channel {lag-intf-num | slot/port} counters"

- id: clear_port_channel_all_counters
  label: "Clear Port-Channel All Counters"
  kind: action
  command: "clear port-channel all counters"

- id: show_storm_control_slot_port_all
  label: "Show Storm-Control [{ <Slot/Port> |"
  kind: query
  command: "show storm-control [{ <slot/port> | all }]"

- id: storm_control_broadcast_multicast_unicast_action
  label: "Storm-Control {Broadcast | Multicast |"
  kind: action
  command: "storm-control {broadcast | multicast | unicast} [ {action { shutdown| trap} | level <0-100>| rate <0-14880000>}]"

- id: storm_control_broadcast
  label: "Storm-Control Broadcast"
  kind: action
  command: "storm-control broadcast"

- id: storm_control_broadcast_2
  label: "No Storm-Control Broadcast"
  kind: action
  command: "no storm-control broadcast"

- id: storm_control_broadcast_action_shutdown_trap
  label: "Storm-Control Broadcast Action { Shutdown"
  kind: action
  command: "storm-control broadcast action { shutdown | trap }"

- id: storm_control_broadcast_action
  label: "No Storm-Control Broadcast Action"
  kind: action
  command: "no storm-control broadcast action"

- id: storm_control_broadcast_rate_0_14880000
  label: "Storm-Control Broadcast Rate <0-14880000>"
  kind: action
  command: "storm-control broadcast rate <0-14880000>"

- id: storm_control_broadcast_rate
  label: "No Storm-Control Broadcast Rate"
  kind: action
  command: "no storm-control broadcast rate"

- id: storm_control_broadcast_level_0_100
  label: "Storm-Control Broadcast Level <0-100>"
  kind: action
  command: "storm-control broadcast level <0-100>"

- id: storm_control_broadcast_level
  label: "No Storm-Control Broadcast Level"
  kind: action
  command: "no storm-control broadcast level"

- id: storm_control_multicast
  label: "Storm-Control Multicast"
  kind: action
  command: "storm-control multicast"

- id: storm_control_multicast_2
  label: "No Storm-Control Multicast"
  kind: action
  command: "no storm-control multicast"

- id: storm_control_multicast_action_shutdown_trap
  label: "Storm-Control Multicast Action {Shutdown |"
  kind: action
  command: "storm-control multicast action {shutdown | trap}"

- id: storm_control_multicast_action
  label: "No Storm-Control Multicast Action"
  kind: action
  command: "no storm-control multicast action"

- id: storm_control_multicast_level_0_100
  label: "Storm-Control Multicast Level <0-100>"
  kind: action
  command: "storm-control multicast level <0-100>"

- id: storm_control_multicast_level
  label: "No Storm-Control Multicast Level"
  kind: action
  command: "no storm-control multicast level"

- id: storm_control_multicast_rate_0_14880000
  label: "Storm-Control Multicast Rate <0-14880000>"
  kind: action
  command: "storm-control multicast rate <0-14880000>"

- id: storm_control_multicast_rate
  label: "No Storm-Control Multicast Rate"
  kind: action
  command: "no storm-control multicast rate"

- id: storm_control_unicast
  label: "Storm-Control Unicast"
  kind: action
  command: "storm-control unicast"

- id: storm_control_unicast_2
  label: "No Storm-Control Unicast"
  kind: action
  command: "no storm-control unicast"

- id: storm_control_unicast_action_shutdown_trap
  label: "Storm-Control Unicast Action { Shutdown"
  kind: action
  command: "storm-control unicast action { shutdown | trap }"

- id: storm_control_unicast_action
  label: "No Storm-Control Unicast Action"
  kind: action
  command: "no storm-control unicast action"

- id: storm_control_unicast_level_0_100
  label: "Storm-Control Unicast Level <0-100>"
  kind: action
  command: "storm-control unicast level <0-100>"

- id: storm_control_multicast_level_2
  label: "No Storm-Control Multicast Level"
  kind: action
  command: "no storm-control multicast level"

- id: storm_control_unicast_rate_0_14880000
  label: "Storm-Control Unicast Rate <0-14880000>"
  kind: action
  command: "storm-control unicast rate <0-14880000>"

- id: storm_control_unicast_rate
  label: "No Storm-Control Unicast Rate"
  kind: action
  command: "no storm-control unicast rate"

- id: show_queue_cos_map_slot_port
  label: "Show Queue Cos-Map <Slot/Port>"
  kind: query
  command: "show queue cos-map <slot/port>"

- id: queue_cos_map_0_7_0
  label: "Queue Cos-Map <0-7> <0-7>"
  kind: action
  command: "queue cos-map <0-7> <0-7>"

- id: show_monitor_session_1_4_all
  label: "Show Monitor Session { <1-4>"
  kind: query
  command: "show monitor session { <1-4> | all }"

- id: monitor_session_1_4_source_interface
  label: "Monitor Session <1-4> Source {"
  kind: action
  command: "monitor session <1-4> source { interface { <slot/port> | cpu | lag { <1-6> } } [{rx | tx}] } | remote vlan <1-4093>| vlan <1-4093> }"

- id: port_monitor_session_session_id_source
  label: "No Port-Monitor Session <Session-Id> Source"
  kind: action
  command: "no port-monitor session <session-id> source { interface {<slot/port> | cpu | lag } [ {rx | tx} } | remote vlan <vlan-id>| vlan <vlan-id> }"

- id: port_monitor_session_1_4_destination
  label: "Port-Monitor Session <1-4> Destination {"
  kind: action
  command: "port-monitor session <1-4> destination { interface <slot/port> | remote vlan <1-4093> reflector-port <slot/port> }"

- id: port_monitor_session_session_id_destination
  label: "No Port-Monitor Session <Session-Id> Destination"
  kind: action
  command: "no port-monitor session <session-id> destination { interface <slot/port> | remote vlan <vlanid> reflector-port <slot/port> }"

- id: port_monitor_session_1_4
  label: "Port-Monitor Session <1-4> Mode"
  kind: action
  command: "port-monitor session <1-4> mode"

- id: port_monitor_session_session_id
  label: "No Port-Monitor Session <Session-Id> Mode"
  kind: action
  command: "no port-monitor session <session-id> mode"

- id: port_monitor_session_session_id_2
  label: "No Port-Monitor Session <Session-Id>"
  kind: action
  command: "no port-monitor session <session-id>"

- id: port_monitor
  label: "No Port-Monitor"
  kind: action
  command: "no port-monitor"

- id: vlan_priority_0_7
  label: "Vlan Priority <0-7>"
  kind: action
  command: "vlan priority <0-7>"

- id: switchport_priority
  label: "No Switchport Priority"
  kind: action
  command: "no switchport priority"

- id: poe
  label: "Poe"
  kind: action
  command: "poe"

- id: poe_2
  label: "No Poe"
  kind: action
  command: "no poe"

- id: poe_detection_4ptdot3af_legacy_4ptdot3af_legacy
  label: "Poe Detection {4Ptdot3Af | Legacy"
  kind: action
  command: "poe detection {4ptdot3af | legacy | 4ptdot3af+legacy }"

- id: poe_detection
  label: "No Poe Detection"
  kind: action
  command: "no poe detection"

- id: poe_high_power_legacy_pre_dot3at
  label: "Poe High-Power {Legacy | Pre-Dot3At"
  kind: action
  command: "poe high-power {legacy | pre-dot3at | dot3at }"

- id: poe_detection_2
  label: "No Poe Detection"
  kind: action
  command: "no poe detection"

- id: poe_power_limit_class_based_none
  label: "Poe Power Limit {Class-Based |"
  kind: action
  command: "poe power limit {class-based | none | user-defined [<3000-30000>] }"

- id: poe_power_limit
  label: "No Poe Power Limit"
  kind: action
  command: "no poe power limit"

- id: poe_power_management_dynamic_static
  label: "Poe Power Management {Dynamic |"
  kind: action
  command: "poe power management {dynamic | static}"

- id: poe_power_management
  label: "No Poe Power Management"
  kind: action
  command: "no poe power management"

- id: poe_priority_crit_high_low_medium
  label: "Poe Priority {Crit | High"
  kind: action
  command: "poe priority {crit | high | low | medium }"

- id: poe_priority
  label: "No Poe Priority"
  kind: action
  command: "no poe priority"

- id: poe_reset
  label: "Poe Reset"
  kind: action
  command: "poe reset"

- id: poe_timer_schedule_time_range_name
  label: "Poe Timer Schedule <Time Range"
  kind: action
  command: "poe timer schedule <time range name>"

- id: poe_timer_schedule
  label: "No Poe Timer Schedule"
  kind: action
  command: "no poe timer schedule"

- id: poe_usagethreshold_1_99
  label: "Poe Usagethreshold <1-99>"
  kind: action
  command: "poe usagethreshold <1-99>"

- id: poe_traps
  label: "No Poe Traps"
  kind: action
  command: "no poe traps"

- id: show_poe
  label: "Show Poe"
  kind: query
  command: "show poe"

- id: show_poe_port_configuration_port_all
  label: "Show Poe Port Configuration [<Port>"
  kind: query
  command: "show poe port configuration [<port> | all]"

- id: show_poe_port_info_port_all
  label: "Show Poe Port Info [<Port>"
  kind: query
  command: "show poe port info [<port> | all]"

- id: show_ip_interface_slot_port_vlan
  label: "Show Ip Interface { Slot/Port"
  kind: query
  command: "show ip interface { slot/port |vlan 1-4093 }"

- id: mtu_1500_9198
  label: "Mtu <1500-9198>"
  kind: action
  command: "mtu <1500-9198>"

- id: mtu_2
  label: "No Mtu"
  kind: action
  command: "no mtu"

- id: interface_vlan_vlan_id
  label: "Interface Vlan <Vlan-Id>"
  kind: action
  command: "interface vlan <vlan-id>"

- id: ip_address_ipaddr_subnetmask_prefix_length
  label: "Ip Address <Ipaddr> {Subnetmask |"
  kind: action
  command: "ip address <ipaddr> {subnetmask | /prefix-length} [secondary]"

- id: ip_address_ipaddr_subnetmask_prefix_length_2
  label: "No Ip Address <Ipaddr> {Subnetmask"
  kind: action
  command: "no ip address <ipaddr> {subnetmask | /prefix-length} [secondary]"

- id: ip_gateway_gateway_addr
  label: "Ip Default-Gateway <Gateway-Addr>"
  kind: action
  command: "ip default-gateway <gateway-addr>"

- id: ip_address_dhcp
  label: "Ip Address Dhcp"
  kind: action
  command: "ip address dhcp"

- id: show_line_console
  label: "Show Line Console"
  kind: query
  command: "show line console"

- id: line_console
  label: "Line Console"
  kind: action
  command: "line console"

- id: serial_baudrate_1200_2400_4800_9600
  label: "Serial Baudrate {1200 | 2400"
  kind: action
  command: "serial baudrate {1200 | 2400 | 4800 | 9600 | 19200 | 38400 | 57600 | 115200}"

- id: serial_baudrate
  label: "No Serial Baudrate"
  kind: action
  command: "no serial baudrate"

- id: serial_timeout_0_160
  label: "Serial Timeout <0-160>"
  kind: action
  command: "serial timeout <0-160>"

- id: serial_timeout
  label: "No Serial Timeout"
  kind: action
  command: "no serial timeout"

- id: telnet_ip_address_hostname_port_debug
  label: "Telnet <Ip-Address|Hostname> [Port] [Debug] [Line]"
  kind: action
  command: "telnet <ip-address|hostname> [port] [debug] [line]"

- id: show_telnetcon
  label: "Show Telnetcon"
  kind: query
  command: "show telnetcon"

- id: line_telnet
  label: "Line Telnet"
  kind: action
  command: "line telnet"

- id: transport_input_telnet
  label: "Transport Input Telnet"
  kind: action
  command: "transport input telnet"

- id: transport_input_telnet_2
  label: "No Transport Input Telnet"
  kind: action
  command: "no transport input telnet"

- id: telnetcon_maxsessions_0_4
  label: "Telnetcon Maxsessions <0-4>"
  kind: action
  command: "telnetcon maxsessions <0-4>"

- id: telnetcon_maxsessions
  label: "No Telnetcon Maxsessions"
  kind: action
  command: "no telnetcon maxsessions"

- id: telnetcon_timeout_1_160
  label: "Telnetcon Timeout <1-160>"
  kind: action
  command: "telnetcon timeout <1-160>"

- id: telnetcon_timeout
  label: "No Telnetcon Timeout"
  kind: action
  command: "no telnetcon timeout"

- id: show_telnet
  label: "Show Telnet"
  kind: query
  command: "show telnet"

- id: show_snmp
  label: "Show Snmp"
  kind: query
  command: "show snmp"

- id: snmp_server_sysname_name
  label: "Snmp-Server Sysname <Name>"
  kind: action
  command: "snmp-server sysname <name>"

- id: snmp_server_location_loc
  label: "Snmp-Server Location <Loc>"
  kind: action
  command: "snmp-server location <loc>"

- id: snmp_server_contact_con
  label: "Snmp-Server Contact <Con>"
  kind: action
  command: "snmp-server contact <con>"

- id: snmp_server_community_community_string_ipaddress
  label: "Snmp-Server Community <Community-String> [Ipaddress <Ipaddress>"
  kind: action
  command: "snmp-server community <community-string> [ipaddress <ipaddress> | ro | rw | su | view <viewname>]"

- id: snmp_server_community_community_string
  label: "No Snmp-Server Community <Community-String>"
  kind: action
  command: "no snmp-server community <community-string>"

- id: snmp_server_community_group_community_string
  label: "Snmp-Server Community-Group <Community-String> <Group-Name> [Ipaddress"
  kind: action
  command: "snmp-server community-group <community-string> <group-name> [ipaddress <ip-address>]"

- id: snmp_server_community_group_community_string_2
  label: "No Snmp-Server Community-Group <Community-String>"
  kind: action
  command: "no snmp-server community-group <community-string>"

- id: show_snmp_engineid
  label: "Show Snmp Engineid"
  kind: query
  command: "show snmp engineid"

- id: snmp_server_engineid_local_engine_id
  label: "Snmp-Server Engineid Local {<Engine-Id> |"
  kind: action
  command: "snmp-server engineID local {<engine-id> | default}"

- id: snmp_server_engineid_local
  label: "No Snmp-Server Engineid Local"
  kind: action
  command: "no snmp-server engineID local"

- id: show_snmp_filters_filter_name
  label: "Show Snmp Filters [<Filter-Name>]"
  kind: query
  command: "show snmp filters [<filter-name>]"

- id: snmp_server_filter_filter_name_oid
  label: "Snmp-Server Filter <Filter-Name> <Oid-Tree> [Excluded"
  kind: action
  command: "snmp-server filter <filter-name> <oid-tree> [excluded | included]"

- id: snmp_server_filter_filter_name_oid_2
  label: "No Snmp-Server Filter <Filter-Name> [<Oid-Tree"
  kind: action
  command: "no snmp-server filter <filter-name> [<oid-tree >]"

- id: show_snmp_user_username
  label: "Show Snmp User [<Username>]"
  kind: query
  command: "show snmp user [<username>]"

- id: snmp_server_user_name_group_name
  label: "Snmp-Server User <Name> <Group-Name> [Remote"
  kind: action
  command: "snmp-server user <name> <group-name> [remote <engine-idstring>] {[auth-md5 <password> | auth-md5-key <md5-key> | auth-sha <password> | auth-sha-key <sha-key>] [priv-des <password> | priv-des-key <des-key>]}"

- id: snmp_server_user_name_remote_engine
  label: "No Snmp-Server User <Name> [Remote"
  kind: action
  command: "no snmp-server user <name> [remote <engine-idstring>]"

- id: show_snmp_group_groupname
  label: "Show Snmp Group [<Groupname>]"
  kind: query
  command: "show snmp group [<groupname>]"

- id: snmp_server_group_group_name_v1
  label: "Snmp-Server Group <Group-Name> [V1 |"
  kind: action
  command: "snmp-server group <group-name> [v1 | v2 | v3 {auth | noauth | priv}] {[read <readview>] | [write <writeview>] | [context <contextprefix>] | [notify <notifyview>]}"

- id: snmp_server_group_group_name_v1_2
  label: "No Snmp-Server Group <Group-Name> [V1"
  kind: action
  command: "no snmp-server group <group-name> [v1 | v2 | v3 {auth | noauth | priv}] { [context <contextprefix>] | [notify <notifyview>]}"

- id: show_snmp_views_viewname
  label: "Show Snmp Views [<Viewname>]"
  kind: query
  command: "show snmp views [<viewname>]"

- id: snmp_server_view_view_name_oid
  label: "Snmp-Server View <View-Name> <Oid-Tree> [Excluded"
  kind: action
  command: "snmp-server view <view-name> <oid-tree> [excluded | included]"

- id: snmp_server_view_view_name_oid_2
  label: "No Snmp-Server View <View-Name> [<Oid-Tree>]"
  kind: action
  command: "no snmp-server view <view-name> [<oid-tree>]"

- id: snmp_server_host_host_addr_traps
  label: "Snmp-Server Host <Host-Addr> Traps Version"
  kind: action
  command: "snmp-server host <host-addr> traps version {1 <community> | 2 <community> | 3 <username> [auth | noauth | priv]} [filter <filtername>] [udp-port <1-65535>]"

- id: snmp_server_host_host_addr
  label: "No Snmp-Server Host <Host-Addr>"
  kind: action
  command: "no snmp-server host <host-addr>"

- id: show_trapflags
  label: "Show Trapflags"
  kind: query
  command: "show trapflags"

- id: snmp_trap_link_status_all
  label: "Snmp Trap Link-Status All"
  kind: action
  command: "snmp trap link-status all"

- id: snmp_trap_link_status_all_2
  label: "No Snmp Trap Link-Status All"
  kind: action
  command: "no snmp trap link-status all"

- id: snmp_server_enable_traps_linkmode
  label: "Snmp-Server Enable Traps Linkmode"
  kind: action
  command: "snmp-server enable traps linkmode"

- id: snmp_server_enable_traps_linkmode_2
  label: "No Snmp-Server Enable Traps Linkmode"
  kind: action
  command: "no snmp-server enable traps linkmode"

- id: snmp_server_enable_traps_multiusers
  label: "Snmp-Server Enable Traps Multiusers"
  kind: action
  command: "snmp-server enable traps multiusers"

- id: snmp_server_enable_traps_multiusers_2
  label: "No Snmp-Server Enable Traps Multiusers"
  kind: action
  command: "no snmp-server enable traps multiusers"

- id: snmp_server_enable_traps_stpmode
  label: "Snmp-Server Enable Traps Stpmode"
  kind: action
  command: "snmp-server enable traps stpmode"

- id: snmp_server_enable_traps_stpmode_2
  label: "No Snmp-Server Enable Traps Stpmode"
  kind: action
  command: "no snmp-server enable traps stpmode"

- id: snmp_server_enable_traps_violation
  label: "Snmp-Server Enable Traps Violation"
  kind: action
  command: "snmp-server enable traps violation"

- id: snmp_server_enable_traps_violation_2
  label: "No Snmp-Server Enable Traps Violation"
  kind: action
  command: "no snmp-server enable traps violation"

- id: show_snmp_source_interface
  label: "Show Snmp Source-Interface"
  kind: query
  command: "show snmp source-interface"

- id: snmptrap_source_interface_slot_port_vlan
  label: "Snmptrap Source-Interface {<Slot/Port> | Vlan"
  kind: action
  command: "snmptrap source-interface {<slot/port> | vlan <vlan-id>}"

- id: snmptrap_source_interface
  label: "No Snmptrap Source-Interface"
  kind: action
  command: "no snmptrap source-interface"

- id: snmp_server_host_host_addr_informs
  label: "Snmp-Server Host <Host-Addr> Informs Version"
  kind: action
  command: "snmp-server host <host-addr> informs version {2 <community> | 3 <username> [auth | noauth | priv]} [filter <filtername>] [udp-port <1-65535>] [retries <0-255>] [timeout <1-300>]"

- id: snmp_server_host_host_addr_2
  label: "No Snmp-Server Host <Host-Addr>"
  kind: action
  command: "no snmp-server host <host-addr>"

- id: show_ip_ssh
  label: "Show Ip Ssh"
  kind: query
  command: "show ip ssh"

- id: ip_ssh
  label: "Ip Ssh"
  kind: action
  command: "ip ssh"

- id: ip_ssh_2
  label: "No Ip Ssh"
  kind: action
  command: "no ip ssh"

- id: ip_ssh_maxsessions_0_2
  label: "Ip Ssh Maxsessions <0-2>"
  kind: action
  command: "ip ssh maxsessions <0-2>"

- id: ip_ssh_maxsessions
  label: "No Ip Ssh Maxsessions"
  kind: action
  command: "no ip ssh maxsessions"

- id: sshcon_timeout_1_160
  label: "Sshcon Timeout <1-160>"
  kind: action
  command: "sshcon timeout <1-160>"

- id: sshcon_timeout
  label: "No Sshcon Timeout"
  kind: action
  command: "no sshcon timeout"

- id: crypto_key_generate_rsa_dsa
  label: "Crypto Key Generate {Rsa |"
  kind: action
  command: "crypto key generate {RSA | DSA}"

- id: crypto_key_generate_rsa_dsa_2
  label: "No Crypto Key Generate {Rsa"
  kind: action
  command: "no crypto key generate {RSA | DSA}"

- id: crypto_certificate_generate
  label: "Crypto Certificate Generate"
  kind: action
  command: "crypto certificate generate"

- id: crypto_certificate_generate_2
  label: "No Crypto Certificate Generate"
  kind: action
  command: "no crypto certificate generate"

- id: show_time_range_name
  label: "Show Time-Range [<Name>]"
  kind: query
  command: "show time-range [<name>]"

- id: time_range_none
  label: "Time-Range Default None"
  kind: action
  command: "time-range Default None"

- id: time_range
  label: "No Time-Range"
  kind: action
  command: "no time-range"

- id: time_range_name
  label: "Time-Range <Name>"
  kind: action
  command: "time-range <name>"

- id: time_range_name_2
  label: "No Time-Range <Name>"
  kind: action
  command: "no time-range <name>"

- id: absolute_start_hh_mm_1_31
  label: "Absolute {Start <Hh:Mm> <1-31> <Month>"
  kind: action
  command: "absolute {start <hh:mm> <1-31> <month> <1970-2035> [end <hh:mm> <1-31> <month> <19702035>] | end <hh:mm> <1-31> <month> <1970-2035>}"

- id: absolute
  label: "No Absolute"
  kind: action
  command: "no absolute"

- id: show_sdm_prefer_dual_ipv4_and
  label: "Show Sdm Prefer { Dual-Ipv4-And-Ipv6"
  kind: query
  command: "show sdm prefer { dual-ipv4-and-ipv6 {alpm | data-center | dcvpn-data-center | default} | ipv4routing {data-center {default | plus} | dcvpn-data-center | default}}"

- id: show_spanning_tree
  label: "Show Spanning-Tree"
  kind: query
  command: "show spanning-tree"

- id: show_spanning_tree_interface_slot_port
  label: "Show Spanning-Tree Interface {<Slot/Port> |"
  kind: query
  command: "show spanning-tree interface {<slot/port> | port-channel <portchannel-id>}"

- id: show_spanning_tree_mst_detailed_mstid
  label: "Show Spanning-Tree Mst Detailed <Mstid>"
  kind: query
  command: "show spanning-tree mst detailed <mstid>"

- id: show_spanning_tree_mst_summary
  label: "Show Spanning-Tree Mst Summary"
  kind: query
  command: "show spanning-tree mst summary"

- id: show_spanning_tree_mst_port_detailed
  label: "Show Spanning-Tree Mst Port Detailed"
  kind: query
  command: "show spanning-tree mst port detailed <mstid> {<slot/port> | port-channel <portchannel-id>}"

- id: show_spanning_tree_mst_port_summary
  label: "Show Spanning-Tree Mst Port Summary"
  kind: query
  command: "show spanning-tree mst port summary <mstid> [{<slot/port> | active | port-channel <portchannel-id>}]"

- id: show_spanning_tree_summary
  label: "Show Spanning-Tree Summary"
  kind: query
  command: "show spanning-tree summary"

- id: show_spanning_tree_brief
  label: "Show Spanning-Tree Brief"
  kind: query
  command: "show spanning-tree brief"

- id: spanning_tree
  label: "Spanning-Tree"
  kind: action
  command: "spanning-tree"

- id: spanning_tree_2
  label: "No Spanning-Tree"
  kind: action
  command: "no spanning-tree"

- id: spanning_tree_bpdumigrationcheck_slot_port_port
  label: "Spanning-Tree Bpdumigrationcheck{<Slot/Port> | Port-Channel <Portchannel-Id>"
  kind: action
  command: "spanning-tree bpdumigrationcheck{<slot/port> | port-channel <portchannel-id> | all}"

- id: spanning_tree_configuration_name_name
  label: "Spanning-Tree Configuration Name <Name>"
  kind: action
  command: "spanning-tree configuration name <name>"

- id: spanning_tree_configuration_name
  label: "No Spanning-Tree Configuration Name"
  kind: action
  command: "no spanning-tree configuration name"

- id: spanning_tree_configuration_revision_0_65535
  label: "Spanning-Tree Configuration Revision <0-65535>"
  kind: action
  command: "spanning-tree configuration revision <0-65535>"

- id: spanning_tree_configuration_revision
  label: "No Spanning-Tree Configuration Revision"
  kind: action
  command: "no spanning-tree configuration revision"

- id: spanning_tree_mstp_rstp
  label: "Spanning-Tree Mode {Mstp | Rstp}"
  kind: action
  command: "spanning-tree mode {mstp | rstp}"

- id: spanning_tree_3
  label: "No Spanning-Tree Mode"
  kind: action
  command: "no spanning-tree mode"

- id: spanning_tree_forward_time_4_30
  label: "Spanning-Tree Forward-Time <4-30>"
  kind: action
  command: "spanning-tree forward-time <4-30>"

- id: spanning_tree_forward_time
  label: "No Spanning-Tree Forward-Time"
  kind: action
  command: "no spanning-tree forward-time"

- id: spanning_tree_max_age_6_40
  label: "Spanning-Tree Max-Age <6-40>"
  kind: action
  command: "spanning-tree max-age <6-40>"

- id: spanning_tree_max_age
  label: "No Spanning-Tree Max-Age"
  kind: action
  command: "no spanning-tree max-age"

- id: spanning_tree_forward_time_4_30_2
  label: "Spanning-Tree Forward-Time <4-30> Max-Age <6-40>"
  kind: action
  command: "spanning-tree forward-time <4-30> max-age <6-40>"

- id: spanning_tree_max_hops_6_40
  label: "Spanning-Tree Max-Hops <6-40>"
  kind: action
  command: "spanning-tree max-hops <6-40>"

- id: spanning_tree_max_hops
  label: "No Spanning-Tree Max-Hops"
  kind: action
  command: "no spanning-tree max-hops"

- id: spanning_tree_mst_instance_mstid
  label: "Spanning-Tree Mst Instance <Mstid>"
  kind: action
  command: "spanning-tree mst instance <mstid>"

- id: spanning_tree_mst_instance_mstid_2
  label: "No Spanning-Tree Mst Instance <Mstid>"
  kind: action
  command: "no spanning-tree mst instance <mstid>"

- id: spanning_tree_mst_priority_mstid_0
  label: "Spanning-Tree Mst Priority <Mstid> <0-61440>"
  kind: action
  command: "spanning-tree mst priority <mstid> <0-61440>"

- id: spanning_tree_mst_priority_mstid
  label: "No Spanning-Tree Mst Priority <Mstid>"
  kind: action
  command: "no spanning-tree mst priority <mstid>"

- id: spanning_tree_mst_vlan_mstid_vlan
  label: "Spanning-Tree Mst Vlan <Mstid> <Vlan-List>"
  kind: action
  command: "spanning-tree mst vlan <mstid> <vlan-list>"

- id: spanning_tree_mst_vlan_mstid_vlan_2
  label: "No Spanning-Tree Mst Vlan <Mstid>"
  kind: action
  command: "no spanning-tree mst vlan <mstid> <vlan-list>"

- id: spanning_tree_mst_mstid_cost_1
  label: "Spanning-Tree Mst <Mstid> {{Cost <1-200000000>"
  kind: action
  command: "spanning-tree mst <mstid> {{cost <1-200000000> | auto} | port-priority <0-240>}"

- id: spanning_tree_mst_mstid_cost_port
  label: "No Spanning-Tree Mst <Mstid> {Cost"
  kind: action
  command: "no spanning-tree mst <mstid> {cost | port-priority}"

- id: spanning_tree_port
  label: "Spanning-Tree Port Mode"
  kind: action
  command: "spanning-tree port mode"

- id: spanning_tree_port_2
  label: "No Spanning-Tree Port Mode"
  kind: action
  command: "no spanning-tree port mode"

- id: spanning_tree_port_all
  label: "Spanning-Tree Port Mode All"
  kind: action
  command: "spanning-tree port mode all"

- id: spanning_tree_port_all_2
  label: "No Spanning-Tree Port Mode All"
  kind: action
  command: "no spanning-tree port mode all"

- id: spanning_tree_auto_edge
  label: "Spanning-Tree Auto-Edge"
  kind: action
  command: "spanning-tree auto-edge"

- id: spanning_tree_auto_edge_2
  label: "No Spanning-Tree Auto-Edge"
  kind: action
  command: "no spanning-tree auto-edge"

- id: spanning_tree_cost_cost_auto
  label: "Spanning-Tree Cost {<Cost> | Auto}"
  kind: action
  command: "spanning-tree cost {<cost> | auto}"

- id: spanning_tree_cost
  label: "No Spanning-Tree Cost"
  kind: action
  command: "no spanning-tree cost"

- id: spanning_tree_edgeport
  label: "Spanning-Tree Edgeport"
  kind: action
  command: "spanning-tree edgeport"

- id: spanning_tree_edgeport_2
  label: "No Spanning-Tree Edgeport"
  kind: action
  command: "no spanning-tree edgeport"

- id: spanning_tree_bpduguard
  label: "Spanning-Tree Bpduguard"
  kind: action
  command: "spanning-tree bpduguard"

- id: spanning_tree_bpduguard_2
  label: "No Spanning-Tree Bpduguard"
  kind: action
  command: "no spanning-tree bpduguard"

- id: spanning_tree_guard_loop_root_none
  label: "Spanning-Tree Guard {Loop | Root|None}"
  kind: action
  command: "spanning-tree guard {loop | root|none}"

- id: spanning_tree_guard
  label: "No Spanning-Tree Guard"
  kind: action
  command: "no spanning-tree guard"

- id: spanning_tree_tcnguard
  label: "Spanning-Tree Tcnguard"
  kind: action
  command: "spanning-tree tcnguard"

- id: spanning_tree_tcnguard_2
  label: "No Spanning-Tree Tcnguard"
  kind: action
  command: "no spanning-tree tcnguard"

- id: show_logging
  label: "Show Logging"
  kind: query
  command: "show logging"

- id: show_logging_buffered
  label: "Show Logging Buffered"
  kind: query
  command: "show logging buffered"

- id: logging_buffered
  label: "Logging Buffered"
  kind: action
  command: "[no] logging buffered"

- id: logging_buffered_severitylevel_keyword_0_7
  label: "Logging Buffered [<Severitylevel Keyword> |"
  kind: action
  command: "logging buffered [<severitylevel keyword> | <0 ~ 7>]"

- id: logging_buffered_wrap
  label: "Logging Buffered Wrap"
  kind: action
  command: "[no] logging buffered wrap"

- id: clear_logging_buffered
  label: "Clear Logging Buffered"
  kind: action
  command: "clear logging buffered"

- id: show_logging_traplogs
  label: "Show Logging Traplogs"
  kind: query
  command: "show logging traplogs"

- id: show_logging_hosts
  label: "Show Logging Hosts"
  kind: query
  command: "show logging hosts"

- id: logging_host_hostaddress_hostname_dns_ipv4
  label: "Logging Host <Hostaddress|Hostname> {{Dns |"
  kind: action
  command: "logging host <hostaddress|hostname> {{dns | ipv4 | ipv6} [<port>] [<severitylevel>]}"

- id: logging_host_remove_hostindex
  label: "Logging Host Remove <Hostindex>"
  kind: action
  command: "logging host remove <hostindex>"

- id: logging_host_reconfigure_hostindex_hostaddress_hostname
  label: "Logging Host Reconfigure <Hostindex> {<Hostaddress|Hostname>"
  kind: action
  command: "logging host reconfigure <hostindex> {<hostaddress|hostname> | port <port> | severitylevel <severitylevel>}"

- id: logging_syslog
  label: "Logging Syslog"
  kind: action
  command: "[no] logging syslog"

- id: logging_syslog_port_portid
  label: "Logging Syslog Port <Portid>"
  kind: action
  command: "[no] logging syslog port <portid>"

- id: logging_syslog_facility_facility
  label: "Logging Syslog Facility <Facility>"
  kind: action
  command: "logging syslog facility <facility>"

- id: logging_syslog_source_interface_slot_port
  label: "Logging Syslog Source-Interface {<Slot/Port> |"
  kind: action
  command: "logging syslog source-interface {<slot/port> | network| vlan <vlan-id>}"

- id: logging_console
  label: "Logging Console"
  kind: action
  command: "[no] logging console"

- id: logging_console_severitylevel_keyword_0_7
  label: "Logging Console [<Severitylevel Keyword> |"
  kind: action
  command: "logging console [<severitylevel keyword> | <0 ~ 7>]"

- id: terminal_length_10_100
  label: "Terminal Length <10-100>"
  kind: action
  command: "terminal length <10-100>"

- id: logging_cli_command
  label: "Logging Cli-Command"
  kind: action
  command: "[no] logging cli-command"

- id: script_apply_scriptname
  label: "Script Apply <Scriptname>"
  kind: action
  command: "script apply <scriptname>"

- id: script_delete_scriptname_all
  label: "Script Delete {<Scriptname> | All}"
  kind: action
  command: "script delete {<scriptname> | all}"

- id: script_list
  label: "Script List"
  kind: query
  command: "script list"

- id: script_show_scriptname
  label: "Script Show <Scriptname>"
  kind: query
  command: "script show <scriptname>"

- id: script_validate_scriptname
  label: "Script Validate <Scriptname>"
  kind: query
  command: "script validate <scriptname>"

- id: show_users
  label: "Show Users"
  kind: query
  command: "show users"

- id: show_users_accounts_detail
  label: "Show Users Accounts [Detail]"
  kind: query
  command: "show users accounts [detail]"

- id: show_passwords_configuration
  label: "Show Passwords Configuration"
  kind: query
  command: "show passwords configuration"

- id: show_passwords_result
  label: "Show Passwords Result"
  kind: query
  command: "show passwords result"

- id: username_username_level_level_nopasswd_passwd
  label: "Username <Username> { Level <Level>"
  kind: action
  command: "username <username> { level <level> | nopasswd | passwd <0|7> <password>}"

- id: username_username
  label: "No Username <Username>"
  kind: action
  command: "no username <username>"

- id: username_username_unlock
  label: "Username <Username> Unlock"
  kind: action
  command: "username <username> unlock"

- id: passwords_aging_1_365
  label: "Passwords Aging <1-365>"
  kind: action
  command: "passwords aging <1-365>"

- id: passwords_aging
  label: "No Passwords Aging"
  kind: action
  command: "no passwords aging"

- id: passwords_lock_out_1_5
  label: "Passwords Lock-Out <1-5>"
  kind: action
  command: "passwords lock-out <1-5>"

- id: passwords_lock_out
  label: "No Passwords Lock-Out"
  kind: action
  command: "no passwords lock-out"

- id: passwords_min_length_0_64
  label: "Passwords Min-Length <0-64>"
  kind: action
  command: "passwords min-length <0-64>"

- id: passwords_min_length
  label: "No Passwords Min-Length"
  kind: action
  command: "no passwords min-length"

- id: passwords_strength_check
  label: "Passwords Strength-Check"
  kind: action
  command: "passwords strength-check"

- id: passwords_strength_check_2
  label: "No Passwords Strength-Check"
  kind: action
  command: "no passwords strength-check"

- id: passwords_strength_maximum_consecutive_characters_repeated
  label: "Passwords Strength Maximum {Consecutive-Characters |"
  kind: action
  command: "passwords strength maximum {consecutive-characters | repeated-characters} [<0-15>]"

- id: passwords_strength_maximum_consecutive_characters_repeated_2
  label: "No Passwords Strength Maximum {Consecutive-Characters"
  kind: action
  command: "no passwords strength maximum {consecutive-characters | repeated-characters}"

- id: passwords_strength_minimum_character_classes_0
  label: "Passwords Strength Minimum {Character-Classes <0-4>"
  kind: action
  command: "passwords strength minimum {character-classes <0-4> | lowercase-letters <0-16> | numericcharacters <0-16> | special-characters <0-16> | uppercase-letters <0-16>}"

- id: passwords_strength_exclude_keyword_keyword
  label: "Passwords Strength Exclude-Keyword <Keyword>"
  kind: action
  command: "passwords strength exclude-keyword <keyword>"

- id: passwords_strength_exclude_keyword_keyword_2
  label: "No Passwords Strength Exclude-Keyword <Keyword>"
  kind: action
  command: "no passwords strength exclude-keyword <keyword>"

- id: show_authentication_methods
  label: "Show Authentication Methods"
  kind: query
  command: "show authentication methods"

- id: show_dot1x_summary_slot_port_detail
  label: "Show Dot1X [Summary [<Slot/Port>] |"
  kind: query
  command: "show dot1x [summary [<slot/port>] | detail <slot/port> | statistics <slot/port>]"

- id: show_dot1x_authentication_history_slot_port
  label: "Show Dot1X Authentication-History {<Slot/Port> |"
  kind: query
  command: "show dot1x authentication-history {<slot/port> | all} [failed-auth-only] [detail]"

- id: show_dot1x_clients_slot_port
  label: "Show Dot1X Clients [<Slot/Port>]"
  kind: query
  command: "show dot1x clients [<slot/port>]"

- id: show_dot1x_users_slot_port
  label: "Show Dot1X Users <Slot/Port>"
  kind: query
  command: "show dot1x users <slot/port>"

- id: aaa_authentication_dot1x_ias_local_none
  label: "Aaa Authentication Dot1X Default {Ias"
  kind: action
  command: "aaa authentication dot1x default {ias | local | none | radius}"

- id: clear_dot1x_statistics_slot_port_all
  label: "Clear Dot1X Statistics {<Slot/Port> |"
  kind: action
  command: "clear dot1x statistics {<slot/port> | all}"

- id: clear_dot1x_authentication_history_slot_port
  label: "Clear Dot1X Authentication-History [Slot/Port]"
  kind: action
  command: "clear dot1x authentication-history [slot/port]"

- id: clear_radius_statistics
  label: "Clear Radius Statistics"
  kind: action
  command: "clear radius statistics"

- id: dot1x_eapolflood
  label: "Dot1X Eapolflood"
  kind: action
  command: "dot1x eapolflood"

- id: dot1x_eapolflood_2
  label: "No Dot1X Eapolflood"
  kind: action
  command: "no dot1x eapolflood"

- id: dot1x_dynamic_vlan_enable
  label: "Dot1X Dynamic-Vlan Enable"
  kind: action
  command: "dot1x dynamic-vlan enable"

- id: dot1x_dynamic_vlan_enable_2
  label: "No Dot1X Dynamic-Vlan Enable"
  kind: action
  command: "no dot1x dynamic-vlan enable"

- id: dot1x_guest_vlan_vlan_id
  label: "Dot1X Guest-Vlan <Vlan-Id>"
  kind: action
  command: "dot1x guest-vlan <vlan-id>"

- id: dot1x_guest_vlan
  label: "No Dot1X Guest-Vlan"
  kind: action
  command: "no dot1x guest-vlan"

- id: dot1x_initialize_slot_port
  label: "Dot1X Initialize <Slot/Port>"
  kind: action
  command: "dot1x initialize <slot/port>"

- id: dot1x_mac_auth_bypass
  label: "Dot1X Mac-Auth-Bypass"
  kind: action
  command: "dot1x mac-auth-bypass"

- id: dot1x_mac_auth_bypass_2
  label: "No Dot1X Mac-Auth-Bypass"
  kind: action
  command: "no dot1x mac-auth-bypass"

- id: dot1x_max_req_1_10
  label: "Dot1X Max-Req <1-10>"
  kind: action
  command: "dot1x max-req <1-10>"

- id: dot1x_max_req
  label: "No Dot1X Max-Req"
  kind: action
  command: "no dot1x max-req"

- id: dot1x_max_users_count
  label: "Dot1X Max-Users <Count>"
  kind: action
  command: "dot1x max-users <count>"

- id: dot1x_max_users
  label: "No Dot1X Max-Users"
  kind: action
  command: "no dot1x max-users"

- id: dot1x_port_control_force_unauthorized_force
  label: "Dot1X Port-Control {Force-Unauthorized | Force-Authorized"
  kind: action
  command: "dot1x port-control {force-unauthorized | force-authorized | auto | mac-based}"

- id: dot1x_port_control
  label: "No Dot1X Port-Control"
  kind: action
  command: "no dot1x port-control"

- id: dot1x_port_control_all_force_unauthorized
  label: "Dot1X Port-Control All {Force-Unauthorized |"
  kind: action
  command: "dot1x port-control all {force-unauthorized | force-authorized | auto | mac-based}"

- id: dot1x_port_control_all
  label: "No Dot1X Port-Control All"
  kind: action
  command: "no dot1x port-control all"

- id: dot1x_re_authenticate_slot_port
  label: "Dot1X Re-Authenticate <Slot/Port>"
  kind: action
  command: "dot1x re-authenticate <slot/port>"

- id: dot1x_re_authentication
  label: "Dot1X Re-Authentication"
  kind: action
  command: "dot1x re-authentication"

- id: dot1x_re_authentication_2
  label: "No Dot1X Re-Authentication"
  kind: action
  command: "no dot1x re-authentication"

- id: dot1x_system_auth_control
  label: "Dot1X System-Auth-Control"
  kind: action
  command: "dot1x system-auth-control"

- id: dot1x_system_auth_control_2
  label: "No Dot1X System-Auth-Control"
  kind: action
  command: "no dot1x system-auth-control"

- id: dot1x_system_auth_control_monitor
  label: "Dot1X System-Auth-Control Monitor"
  kind: action
  command: "dot1x system-auth-control monitor"

- id: dot1x_system_auth_control_monitor_2
  label: "No Dot1X System-Auth-Control Monitor"
  kind: action
  command: "no dot1x system-auth-control monitor"

- id: dot1x_timeout_guest_vlan_period_seconds
  label: "Dot1X Timeout {{Guest-Vlan-Period <Seconds>} |"
  kind: action
  command: "dot1x timeout {{guest-vlan-period <seconds>} | {reauth-period <seconds>} | {quiet-period <seconds>} | {tx-period <seconds>} | {supp-timeout <seconds>} | {server-timeout <seconds>}}"

- id: dot1x_timeout_guest_vlan_period_reauth
  label: "No Dot1X Timeout {Guest-Vlan-Period |"
  kind: action
  command: "no dot1x timeout {guest-vlan-period | reauth-period | quiet-period | tx-period | supptimeout | server-timeout}"

- id: dot1x_unauthenticated_vlan_vlan_id
  label: "Dot1X Unauthenticated-Vlan <Vlan-Id>"
  kind: action
  command: "dot1x unauthenticated-vlan <vlan-id>"

- id: dot1x_unauthenticated_vlan
  label: "No Dot1X Unauthenticated-Vlan"
  kind: action
  command: "no dot1x unauthenticated-vlan"

- id: dot1x_user_user_slot_port_all
  label: "Dot1X User <User> {<Slot/Port> |"
  kind: action
  command: "dot1x user <user> {<slot/port> | all}"

- id: dot1x_user_user_slot_port_all_2
  label: "No Dot1X User <User> {<Slot/Port>"
  kind: action
  command: "no dot1x user <user> {<slot/port> | all}"

- id: show_accounting_privileged_exec_user_exec
  label: "Show Accounting Mode Privileged Exec"
  kind: query
  command: "show accounting Mode Privileged EXEC User EXEC"

- id: show_accounting_methods
  label: "Show Accounting Methods"
  kind: query
  command: "show accounting methods"

- id: aaa_authentication_login_listname_network_method1
  label: "Aaa Authentication Login {<Listname> |"
  kind: action
  command: "aaa authentication login {<listname> | default | network} method1 [method2…]"

- id: aaa_authentication_login_listname_network
  label: "No Aaa Authentication Login {<Listname>"
  kind: action
  command: "no aaa authentication login {<listname> | default | network}"

- id: aaa_accounting_exec_commands_dot1x_listname
  label: "Aaa Accounting {Exec | Commands"
  kind: action
  command: "aaa accounting {exec | commands | dot1x} {default | <listname>} {start-stop | stop-only | none} method1 [method2…]"

- id: aaa_accounting_exec_commands_dot1x_listname_2
  label: "No Aaa Accounting {Exec |"
  kind: action
  command: "no aaa accounting {exec | commands | dot1x} {default | <listname>}"

- id: accounting_exec_commands_listname
  label: "Accounting {Exec | Commands} {Default"
  kind: action
  command: "accounting {exec | commands} {default | <listname>}"

- id: accounting_exec_commands
  label: "No Accounting {Exec | Commands}"
  kind: action
  command: "no accounting {exec | commands}"

- id: show_radius
  label: "Show Radius"
  kind: query
  command: "show radius"

- id: show_radius_accounting_ip_address_ipv6
  label: "Show Radius Accounting [<Ip-Address |"
  kind: query
  command: "show radius accounting [<ip-address | ipv6-address | hostname> | name [<servername>] | servers | statistics {<ip-address | ipv6-address | hostname> | name <servername>}]"

- id: show_radius_servers_ip_address_ipv6
  label: "Show Radius Servers [<Ip-Address |"
  kind: query
  command: "show radius servers [<ip-address | ipv6-address | hostname> | name <servername>]"

- id: show_radius_statistics_ipaddr_ipv6addr_hostname
  label: "Show Radius Statistics {<Ipaddr |"
  kind: query
  command: "show radius statistics {<ipaddr | ipv6addr | hostname> | name <servername>}"

- id: show_radius_source_interface
  label: "Show Radius Source-Interface"
  kind: query
  command: "show radius source-interface"

- id: authorization_network_radius
  label: "Authorization Network Radius"
  kind: action
  command: "authorization network radius"

- id: authorization_network_radius_2
  label: "No Authorization Network Radius"
  kind: action
  command: "no authorization network radius"

- id: clear_radius_dynamic_author_statistics
  label: "Clear Radius Dynamic-Author Statistics"
  kind: action
  command: "clear radius dynamic-author statistics"

- id: radius_accounting
  label: "Radius Accounting Mode"
  kind: action
  command: "radius accounting mode"

- id: radius_accounting_2
  label: "No Radius Accounting Mode"
  kind: action
  command: "no radius accounting mode"

- id: radius_server_attribute_4_ipaddr
  label: "Radius Server Attribute 4 [<Ipaddr>]"
  kind: action
  command: "radius server attribute 4 [<ipaddr>]"

- id: radius_server_attribute_4
  label: "No Radius Server Attribute 4"
  kind: action
  command: "no radius server attribute 4"

- id: radius_server_attribute_95_ipv6_address
  label: "Radius Server Attribute 95 [<Ipv6-Address>]"
  kind: action
  command: "radius server attribute 95 [<ipv6-address>]"

- id: radius_server_attribute_95
  label: "No Radius Server Attribute 95"
  kind: action
  command: "no radius server attribute 95"

- id: radius_server_deadtime_minutes
  label: "Radius Server Deadtime <Minutes>"
  kind: action
  command: "radius server deadtime <minutes>"

- id: radius_server_deadtime
  label: "No Radius Server Deadtime"
  kind: action
  command: "no radius server deadtime"

- id: radius_server_host_auth_ip_addr
  label: "Radius Server Host Auth <Ip-Addr|"
  kind: action
  command: "radius server host auth <ip-addr| ipv6-address | hostname> [name <servername>] [port <port>] [test <username>] [deadtime <minutes>] [idle-time <1-35791>]"

- id: radius_server_host_acct_auth_ip
  label: "No Radius Server Host {Acct"
  kind: action
  command: "no radius server host {acct | auth} <ip-addr| ipv6-address | hostname>"

- id: radius_server_host_auth_link_local
  label: "Radius Server Host Auth Link-Local"
  kind: action
  command: "radius server host auth link-local <link-local-address> interface {<slot/port> | network} [name <servername>] [port <port>] [usage-type <8021x|login|both>]"

- id: radius_server_host_acct_auth_link
  label: "No Radius Server Host {Acct"
  kind: action
  command: "no radius server host {acct | auth} link-local <link-local-address>"

- id: radius_server_key_acct_auth_ipaddr
  label: "Radius Server Key {Acct |"
  kind: action
  command: "radius server key {acct | auth} <ipaddr| hostname> [encrypted <password>]"

- id: radius_server_primary_ipaddr_hostname
  label: "Radius Server Primary <Ipaddr| Hostname>"
  kind: action
  command: "radius server primary <ipaddr| hostname>"

- id: radius_server_retransmit_retries
  label: "Radius Server Retransmit <Retries>"
  kind: action
  command: "radius server retransmit <retries>"

- id: radius_server_retransmit
  label: "No Radius Server Retransmit"
  kind: action
  command: "no radius server retransmit"

- id: radius_server_timeout_seconds
  label: "Radius Server Timeout <Seconds>"
  kind: action
  command: "radius server timeout <seconds>"

- id: radius_server_timeout
  label: "No Radius Server Timeout"
  kind: action
  command: "no radius server timeout"

- id: radius_source_interface_slot_port_vlan
  label: "Radius Source-Interface {<Slot/Port> | Vlan"
  kind: action
  command: "radius source-interface {<slot/port> | vlan <vlan-id>}"

- id: radius_source_interface
  label: "No Radius Source-Interface"
  kind: action
  command: "no radius source-interface"

- id: show_tacacs_ip_address_hostname
  label: "Show Tacacs [<Ip-Address | Hostname>]"
  kind: query
  command: "show tacacs [<ip-address | hostname>]"

- id: show_tacacs_source_interface
  label: "Show Tacacs Source-Interface"
  kind: query
  command: "show tacacs source-interface"

- id: tacacs_server_host_ipaddr_hostname
  label: "Tacacs-Server Host <Ipaddr | Hostname>"
  kind: action
  command: "tacacs-server host <ipAddr | hostname>"

- id: tacacs_server_host_ipaddr_hostname_2
  label: "No Tacacs-Server Host <Ipaddr |"
  kind: action
  command: "no tacacs-server host <ipAddr | hostname>"

- id: tacacs_server_host_link_local_link
  label: "Tacacs-Server Host Link-Local <Link-Local-Address> Interface"
  kind: action
  command: "tacacs-server host link-local <link-local-address> interface { <slot/port>}"

- id: tacacs_server_host_link_local
  label: "No Tacacs-Server Host Link-Local"
  kind: action
  command: "no tacacs-server host link-local"

- id: tacacs_server_key_key_string_encrypted
  label: "Tacacs-Server Key [<Key-String> | Encrypted"
  kind: action
  command: "tacacs-server key [<key-string> | encrypted <key-string>]"

- id: tacacs_server_host_ipaddr_hostname_3
  label: "No Tacacs-Server Host <Ipaddr |"
  kind: action
  command: "no tacacs-server host <ipAddr | hostname>"

- id: tacacs_server_keysting
  label: "Tacacs-Server Keysting"
  kind: action
  command: "tacacs-server keysting"

- id: tacacs_server_timeout_timeout
  label: "Tacacs-Server Timeout [<Timeout>]"
  kind: action
  command: "tacacs-server timeout [<timeout>]"

- id: tacacs_server_timeout
  label: "No Tacacs-Server Timeout"
  kind: action
  command: "no tacacs-server timeout"

- id: key_key_string_encrypted_key_string
  label: "Key [<Key-String> | Encrypted <Key-String>]"
  kind: action
  command: "key [<key-string> | encrypted <key-string>]"

- id: keysting
  label: "Keysting"
  kind: action
  command: "keysting"

- id: port_port_number
  label: "Port [<Port-Number>]"
  kind: action
  command: "port [<port-number>]"

- id: priority_priority
  label: "Priority [<Priority>]"
  kind: action
  command: "priority [<priority>]"

- id: timeout_timeout
  label: "Timeout [<Timeout>]"
  kind: action
  command: "timeout [<timeout>]"

- id: tacacs_server_source_interface_slot_port
  label: "Tacacs-Server Source-Interface {<Slot/Port> | Vlan"
  kind: action
  command: "tacacs-server source-interface {<slot/port> | vlan <vlan-id>}"

- id: tacacs_server_source_interface
  label: "No Tacacs-Server Source-Interface"
  kind: action
  command: "no tacacs-server source-interface"

- id: show_port_security_slot_port_all
  label: "Show Port-Security [{<Slot/Port> | All"
  kind: query
  command: "show port-security [{<slot/port> | all | dynamic | static | violation | port-channel <portchannelid>}]"

- id: show_port_security_static_slot_port
  label: "Show Port-Security Static {<Slot/Port> |"
  kind: query
  command: "show port-security static {<slot/port> | port-channel <portchannel-id>} Mode Privileged EXEC User EXEC"

- id: show_port_security_violation_slot_port
  label: "Show Port-Security Violation {<Slot/Port> |"
  kind: query
  command: "show port-security violation {<slot/port> | port-channel <portchannel-id>}"

- id: port_security_disabled_global_config_interface
  label: "Port-Security Default Disabled Mode Global"
  kind: action
  command: "port-security Default Disabled Mode Global Config Interface Config"

- id: port_security_global_config_interface_config
  label: "No Port-Security Mode Global Config"
  kind: action
  command: "no port-security Mode Global Config Interface Config"

- id: port_security_max_dynamic_0_600
  label: "Port-Security Max-Dynamic <0-600>"
  kind: action
  command: "port-security max-dynamic <0-600>"

- id: port_security_max_dynamic
  label: "No Port-Security Max-Dynamic"
  kind: action
  command: "no port-security max-dynamic"

- id: port_security_max_static_0_20
  label: "Port-Security Max- Static <0-20>"
  kind: action
  command: "port-security max- static <0-20>"

- id: port_security_max_static
  label: "No Port-Security Max- Static"
  kind: action
  command: "no port-security max- static"

- id: port_security_mac_address_mac_address
  label: "Port-Security Mac-Address <Mac-Address> <Vlan-Id>"
  kind: action
  command: "port-security mac-address <mac-address> <vlan-id>"

- id: port_security_mac_address_mac_address_2
  label: "No Port-Security Mac-Address <Mac-Address> <Vlan-Id>"
  kind: action
  command: "no port-security mac-address <mac-address> <vlan-id>"

- id: port_security_mac_address_move
  label: "Port-Security Mac-Address Move"
  kind: action
  command: "port-security mac-address move"

- id: port_security_mac_address_sticky_mac
  label: "Port-Security Mac-Address Sticky [<Mac-Address> <Vlan-Id>]"
  kind: action
  command: "port-security mac-address sticky [<mac-address> <vlan-id>]"

- id: port_security_mac_address_sticky_mac_2
  label: "No Port-Security Mac-Address Sticky [<Mac-Address>"
  kind: action
  command: "no port-security mac-address sticky [<mac-address> <vlan-id>]"

- id: port_security_violation_shutdown
  label: "Port-Security Violation Shutdown"
  kind: action
  command: "port-security violation shutdown"

- id: port_security_violation_shutdown_2
  label: "No Port-Security Violation Shutdown"
  kind: action
  command: "no port-security violation shutdown"

- id: show_sntp
  label: "Show Sntp"
  kind: query
  command: "show sntp"

- id: show_sntp_client
  label: "Show Sntp Client"
  kind: query
  command: "show sntp client"

- id: show_sntp_server
  label: "Show Sntp Server"
  kind: query
  command: "show sntp server"

- id: show_sntp_source_interface_none_privileged
  label: "Show Sntp Source-Interface Default None"
  kind: query
  command: "show sntp source-interface Default None Mode Privileged Exec"

- id: sntp_client_unicast
  label: "Sntp Client Mode Unicast"
  kind: action
  command: "sntp client mode unicast"

- id: sntp_client_global_config
  label: "No Sntp Client Mode Mode"
  kind: action
  command: "no sntp client mode Mode Global Config"

- id: sntp_client_port_portid
  label: "Sntp Client Port <Portid>"
  kind: action
  command: "sntp client port <portid>"

- id: sntp_client_port_global_config
  label: "No Sntp Client Port Mode"
  kind: action
  command: "no sntp client port Mode Global Config"

- id: sntp_unicast_client_poll_interval_6
  label: "Sntp Unicast Client Poll-Interval <6-10>"
  kind: action
  command: "sntp unicast client poll-interval <6-10>"

- id: sntp_unicast_client_poll_interval_6_2
  label: "No Sntp Unicast Client Poll-Interval"
  kind: action
  command: "no sntp unicast client poll-interval <6-10> Mode Global Config"

- id: sntp_unicast_client_poll_timeout_poll
  label: "Sntp Unicast Client Poll-Timeout <Poll-Timeout>"
  kind: action
  command: "sntp unicast client poll-timeout <poll-timeout>"

- id: sntp_unicast_client_poll_timeout
  label: "No Sntp Unicast Client Poll-Timeout"
  kind: action
  command: "no sntp unicast client poll-timeout"

- id: sntp_unicast_client_poll_retry_poll
  label: "Sntp Unicast Client Poll-Retry <Poll-Retry>"
  kind: action
  command: "sntp unicast client poll-retry <poll-retry>"

- id: sntp_unicast_client_poll_retry
  label: "No Sntp Unicast Client Poll-Retry"
  kind: action
  command: "no sntp unicast client poll-retry"

- id: sntp_server_ipaddress_ipv6address_domain_name
  label: "Sntp Server <Ipaddress/Ipv6Address/Domain-Name> [<1-3> [<Version>"
  kind: action
  command: "sntp server <ipaddress/ipv6address/domain-name> [<1-3> [<version> [<portid>]]]"

- id: sntp_server_ipaddress_ipv6address_host_name
  label: "No Sntp Server <Ipaddress/Ipv6Address/Host-Name> <Addresstype>"
  kind: action
  command: "no sntp server <ipaddress/ipv6address/host-name> <addresstype>"

- id: clock_timezone_hours_minutes_minutes_zone
  label: "Clock Timezone { Hours }"
  kind: action
  command: "clock timezone { hours } [minutes minutes ] [zone acronym ]"

- id: sntp_source_interface_slot_port_network
  label: "Sntp Source-Interface {<Slot/Port> | Network"
  kind: action
  command: "sntp source-interface {<slot/port> | network | vlan <vlan-id>}"

- id: sntp_source_interface
  label: "No Sntp Source-Interface"
  kind: action
  command: "no sntp source-interface"

- id: show_lldp
  label: "Show Lldp"
  kind: query
  command: "show lldp"

- id: show_lldp_interface_slot_port
  label: "Show Lldp Interface [<Slot/Port>]"
  kind: query
  command: "show lldp interface [<slot/port>]"

- id: show_lldp_statistics_slot_port_all
  label: "Show Lldp Statistics [<Slot/Port> |"
  kind: query
  command: "show lldp statistics [<slot/port> | all]"

- id: show_lldp_remote_device_slot_port
  label: "Show Lldp Remote-Device [<Slot/Port> |"
  kind: query
  command: "show lldp remote-device [<slot/port> | all | detail ]"

- id: show_lldp_remote_device_detail_slot
  label: "Show Lldp Remote-Device Detail <Slot/Port>"
  kind: query
  command: "show lldp remote-device detail <slot/port>"

- id: show_lldp_local_device_slot_port
  label: "Show Lldp Local-Device [<Slot/Port> |All"
  kind: query
  command: "show lldp local-device [<slot/port> |all | detail ]"

- id: show_lldp_local_device_detail_slot
  label: "Show Lldp Local-Device Detail <Slot/Port>"
  kind: query
  command: "show lldp local-device detail <slot/port>"

- id: lldp_notification
  label: "Lldp Notification"
  kind: action
  command: "lldp notification"

- id: lldp_notification_2
  label: "No Lldp Notification"
  kind: action
  command: "no lldp notification"

- id: lldp_notification_interval_interval_seconds
  label: "Lldp Notification-Interval <Interval-Seconds>"
  kind: action
  command: "lldp notification-interval <interval-seconds>"

- id: lldp_receive
  label: "Lldp Receive"
  kind: action
  command: "lldp receive"

- id: lldp_receive_2
  label: "No Lldp Receive"
  kind: action
  command: "no lldp receive"

- id: lldp_transmit
  label: "Lldp Transmit"
  kind: action
  command: "lldp transmit"

- id: lldp_transmit_2
  label: "No Lldp Transmit"
  kind: action
  command: "no lldp transmit"

- id: lldp_transmit_mgmt
  label: "Lldp Transmit-Mgmt"
  kind: action
  command: "lldp transmit-mgmt"

- id: lldp_transmit_mgmt_2
  label: "No Lldp Transmit-Mgmt"
  kind: action
  command: "no lldp transmit-mgmt"

- id: lldp_transmit_tlv_sys_desc_sys
  label: "Lldp Transmit-Tlv [Sys-Desc] [Sys-Name] [Sys-Cap]"
  kind: action
  command: "lldp transmit-tlv [sys-desc] [sys-name] [sys-cap] [port-desc]"

- id: lldp_transmit_tlv_sys_desc_sys_2
  label: "No Lldp Transmit-Tlv [Sys-Desc] [Sys-Name]"
  kind: action
  command: "no lldp transmit-tlv [sys-desc] [sys-name] [sys-cap] [port-desc]"

- id: lldp_timers_interval_interval_seconds_hold
  label: "Lldp Timers [Interval <Interval-Seconds>] [Hold"
  kind: action
  command: "lldp timers [interval <interval-seconds>] [hold <hold-value>] [reinit <reinit-seconds>]"

- id: lldp_timers_interval_hold_reinit
  label: "No Lldp Timers [Interval] [Hold]"
  kind: action
  command: "no lldp timers [interval] [hold] [reinit]"

- id: lldp_transmit_mgmt_enable
  label: "Lldp Transmit-Mgmt Default Enable"
  kind: action
  command: "lldp transmit-mgmt Default Enable"

- id: lldp_transmit_mgmt_3
  label: "No Lldp Transmit-Mgmt"
  kind: action
  command: "no lldp transmit-mgmt"

- id: lldp_portid_subtype_interface_name_mac
  label: "Lldp Portid-Subtype {| Interface-Name |"
  kind: action
  command: "lldp portid-subtype {| interface-name | mac-address}"

- id: lldp_portid_subtype
  label: "No Lldp Portid-Subtype"
  kind: action
  command: "no lldp portid-subtype"

- id: clear_arp_cache
  label: "Clear Arp-Cache"
  kind: action
  command: "clear arp-cache"

- id: clear_traplog
  label: "Clear Traplog"
  kind: action
  command: "clear traplog"

- id: clear_logging_buffered_2
  label: "Clear Logging Buffered"
  kind: action
  command: "clear logging buffered"

- id: clear_config
  label: "Clear Config"
  kind: action
  command: "clear config"

- id: clear_pass
  label: "Clear Pass"
  kind: action
  command: "clear pass"

- id: clear_counters_slot_port_port_channel
  label: "Clear Counters [<Slot/Port> | Port-Channel"
  kind: action
  command: "clear counters [<slot/port> | port-channel <portchannel-id> | loop-detection | vlan <vlan-id> | all]"

- id: clear_vlan
  label: "Clear Vlan"
  kind: action
  command: "clear vlan"

- id: clear_igmp_snooping
  label: "Clear Igmp Snooping"
  kind: action
  command: "clear igmp snooping"

- id: clear_dot1x_authentication_history_slot_port_2
  label: "Clear Dot1X Authentication-History [<Slot/Port>]"
  kind: action
  command: "clear dot1x authentication-history [<slot/port>]"

- id: clear_radius_statistics_2
  label: "Clear Radius Statistics"
  kind: action
  command: "clear radius statistics"

- id: clear_host_all_hostname
  label: "Clear Host <All | Hostname"
  kind: action
  command: "clear host <all | hostname >"

- id: clear_lldp_statistics
  label: "Clear Lldp Statistics"
  kind: action
  command: "clear lldp statistics"

- id: clear_lldp_remote_data
  label: "Clear Lldp Remote-Data"
  kind: action
  command: "clear lldp remote-data"

- id: clear_ipv6_dhcp_snooping_statistics
  label: "Clear Ipv6 Dhcp Snooping Statistics"
  kind: action
  command: "clear ipv6 dhcp snooping statistics"

- id: enable_passwd_0_7_password
  label: "Enable Passwd {0 | 7}"
  kind: action
  command: "[no] enable passwd {0 | 7} <password>"

- id: copy_url_destination
  label: "Copy <Url > Destination"
  kind: action
  command: "copy <url > destination"

- id: copy_active_backup_backup_active
  label: "Copy {Active Backup | Backup"
  kind: action
  command: "copy {active backup | backup active}"

- id: copy_startup_config_backup_config_backup
  label: "Copy {Startup-Config Backup-Config | Backup-Config"
  kind: action
  command: "copy {startup-config backup-config | backup-config startup-config}"

- id: delete_backup
  label: "Delete Backup"
  kind: action
  command: "delete backup"

- id: erase_application_filename
  label: "Erase Application <Filename>"
  kind: action
  command: "erase application <filename>"

- id: erase_startup_config_factory_defaults
  label: "Erase {Startup-Config | Factory-Defaults}"
  kind: action
  command: "erase {startup-config | factory-defaults}"

- id: dir
  label: "Dir"
  kind: query
  command: "dir"

- id: bootsystem_active_backup
  label: "Bootsystem {Active | Backup}"
  kind: action
  command: "bootsystem {active | backup}"

- id: ping_ip_address_ip6addr_hostname_ipv6
  label: "Ping [] {<Ip-Address> | <Ip6Addr>"
  kind: action
  command: "ping [] {<ip-address> | <ip6addr> | <hostname>} [][] [] [ | ipv6 |]"

- id: ping_ipv6_ipv6_address_hostname_interface
  label: "Ping Ipv6 <Ipv6-Address | Hostname>"
  kind: action
  command: "ping ipv6 <ipv6-address | hostname> | interface network]"

- id: ping_ipv6_interface_network
  label: "Ping Ipv6 Interface {Network]"
  kind: action
  command: "ping ipv6 interface {network]"

- id: traceroute_ipv6_ip_address_hostname
  label: "Traceroute [Ipv6] <Ip-Address | Hostname>]"
  kind: action
  command: "traceroute [ipv6] <ip-address | hostname>]"

- id: traceroute_ipv6_ipv6_address_hostname
  label: "Traceroute Ipv6 <Ipv6-Address | Hostname>]"
  kind: action
  command: "traceroute ipv6 <ipv6-address | hostname>]"

- id: logging_cli_command_2
  label: "Logging Cli-Command"
  kind: action
  command: "logging cli-command"

- id: clockset_mm_dd_yyy_hh_mm
  label: "Clockset <Mm/Dd/Yyy> <Hh:Mm:Ss>"
  kind: action
  command: "clockset <mm/dd/yyy> <hh:mm:ss>"

- id: reload_configuration
  label: "Reload [| Configuration ]"
  kind: action
  command: "reload [| configuration ]"

- id: configure
  label: "Configure"
  kind: action
  command: "Configure"

- id: disconnect_0_65535_all
  label: "Disconnect {<0-65535> | All}"
  kind: action
  command: "disconnect {<0-65535> | all}"

- id: hostname_promptstring
  label: "Hostname <Promptstring>"
  kind: action
  command: "hostname <promptstring>"

- id: quit
  label: "Quit"
  kind: action
  command: "quit"

- id: show_autoinstall
  label: "Show Autoinstall"
  kind: query
  command: "show autoinstall"

- id: show_capture_packets
  label: "Show Capture [Packets]"
  kind: query
  command: "show capture [packets]"

- id: capture_start_all_received_transmit
  label: "Capture Start [{All | Received"
  kind: action
  command: "capture start [{all | received | transmit}]"

- id: capture_stop
  label: "Capture Stop"
  kind: action
  command: "capture stop"

- id: capture_file_remote_line
  label: "Capture {File | Remote |"
  kind: action
  command: "capture {file | remote | line}"

- id: capture_remote_port_port_id
  label: "Capture Remote [Port <Port-Id>]"
  kind: action
  command: "capture remote [port <port-id>]"

- id: capture_file_size_file_size
  label: "Capture File [Size <File-Size>]"
  kind: action
  command: "capture file [size <file-size>]"

- id: capture_line_wrap
  label: "Capture Line [Wrap]"
  kind: action
  command: "capture line [wrap]"

- id: capture_line_wrap_2
  label: "No Capture Line Wrap"
  kind: action
  command: "no capture line wrap"

- id: set_clibanner_line
  label: "Set Clibanner <Line>"
  kind: action
  command: "set clibanner <line>"

- id: set_clibanner
  label: "No Set Clibanner"
  kind: action
  command: "no set clibanner"

- id: show_ip_dhcp_snooping
  label: "Show Ip Dhcp Snooping"
  kind: query
  command: "show ip dhcp snooping"

- id: show_ip_dhcp_snooping_interfaces_slot
  label: "Show Ip Dhcp Snooping Interfaces"
  kind: query
  command: "show ip dhcp snooping interfaces [<slot/port> | port-channel <portchannel-id>] Default None"

- id: show_ip_dhcp_snooping_binding_static
  label: "Show Ip Dhcp Snooping Binding"
  kind: query
  command: "show ip dhcp snooping binding [{static | dynamic}] [interface {<slot/port> | port-channel <portchannel-id>}] [vlan <vlan-id>]"

- id: show_ip_dhcp_snooping_database
  label: "Show Ip Dhcp Snooping Database"
  kind: query
  command: "show ip dhcp snooping database"

- id: show_ip_dhcp_snooping_information_stats
  label: "Show Ip Dhcp Snooping Information"
  kind: query
  command: "show ip dhcp snooping information stats interface {<slot/port> | all} Default None Mode Privileged Exec"

- id: show_ip_dhcp_snooping_information_agent
  label: "Show Ip Dhcp Snooping Information"
  kind: query
  command: "show ip dhcp snooping information agent-option vlan <vlan-list>"

- id: show_ip_dhcp_snooping_information_vlan
  label: "Show Ip Dhcp Snooping Information"
  kind: query
  command: "show ip dhcp snooping information vlan <vlan-list>"

- id: show_ip_dhcp_snooping_information_circuit
  label: "Show Ip Dhcp Snooping Information"
  kind: query
  command: "show ip dhcp snooping information circuit-id vlan <vlan-list>"

- id: show_ip_dhcp_snooping_information_remote
  label: "Show Ip Dhcp Snooping Information"
  kind: query
  command: "show ip dhcp snooping information remote-id vlan <vlan-list>"

- id: show_ip_dhcp_snooping_information_interface
  label: "Show Ip Dhcp Snooping Information"
  kind: query
  command: "show ip dhcp snooping information interface {<slot/port> | all}"

- id: ip_dhcp_snooping
  label: "Ip Dhcp Snooping"
  kind: action
  command: "[no] ip dhcp snooping"

- id: ip_dhcp_snooping_vlan_vlan_list
  label: "Ip Dhcp Snooping Vlan <Vlan-List>"
  kind: action
  command: "[no] ip dhcp snooping vlan <vlan-list>"

- id: ip_dhcp_snooping_verify_mac_address
  label: "Ip Dhcp Snooping Verify Mac-Address"
  kind: action
  command: "[no] ip dhcp snooping verify mac-address"

- id: ip_dhcp_snooping_database_write_delay
  label: "Ip Dhcp Snooping Database Write-Delay"
  kind: action
  command: "ip dhcp snooping database write-delay <interval>"

- id: ip_dhcp_snooping_binding_mac_address
  label: "Ip Dhcp Snooping Binding <Mac-Address>"
  kind: action
  command: "ip dhcp snooping binding <mac-address> vlan <vlan id> <ip address> interface {<slot/port> | port-channel < portchannel-id>}"

- id: ip_dhcp_snooping_information_option
  label: "Ip Dhcp Snooping Information Option"
  kind: action
  command: "[no] ip dhcp snooping information option"

- id: ip_dhcp_snooping_information_option_circuit
  label: "Ip Dhcp Snooping Information Option"
  kind: action
  command: "[no] ip dhcp snooping information option circuit-id vlan <vlan-list>"

- id: ip_dhcp_snooping_information_option_remote
  label: "Ip Dhcp Snooping Information Option"
  kind: action
  command: "[no] ip dhcp snooping information option remote-id <remoteId string> vlan <vlan-list> no ip dhcp snooping information option remote-id vlan <vlan-list>"

- id: ip_dhcp_snooping_information_option_trust
  label: "Ip Dhcp Snooping Information Option"
  kind: action
  command: "[no] ip dhcp snooping information option trust"

- id: ip_dhcp_snooping_limit_rate_pps
  label: "Ip Dhcp Snooping Limit {Rate"
  kind: action
  command: "ip dhcp snooping limit {rate <pps> [burst interval <seconds>]} | none"

- id: ip_dhcp_snooping_log_invalid
  label: "Ip Dhcp Snooping Log-Invalid"
  kind: action
  command: "[no] ip dhcp snooping log-invalid"

- id: ip_dhcp_snooping_trust
  label: "Ip Dhcp Snooping Trust"
  kind: action
  command: "[no] ip dhcp snooping trust"

- id: ip_dhcp_snooping_trust_2
  label: "Ip Dhcp Snooping Trust"
  kind: action
  command: "[no] ip dhcp snooping trust"

- id: clear_ip_dhcp_snooping_binding_interface
  label: "Clear Ip Dhcp Snooping Binding"
  kind: action
  command: "clear ip dhcp snooping binding [interface <slot/port>]"

- id: clear_ip_dhcp_snooping_statistics
  label: "Clear Ip Dhcp Snooping Statistics"
  kind: action
  command: "clear ip dhcp snooping statistics"

- id: clear_ip_dhcp_snooping_information_statistics
  label: "Clear Ip Dhcp Snooping Information"
  kind: action
  command: "clear ip dhcp snooping information statistics interface [<slot/port> | all] Default None"

- id: diffsev
  label: "Diffsev"
  kind: action
  command: "diffsev"

- id: diffsev_2
  label: "No Diffsev"
  kind: action
  command: "no diffsev"

- id: class_map_match_all_class_map
  label: "Class-Map [Match-All] <Class-Map-Name> [{Ipv4 |"
  kind: action
  command: "class-map [match-all] <class-map-name> [{ipv4 | ipv6}]"

- id: class_map_class_map_name
  label: "No Class-Map <Class-Map-Name>"
  kind: action
  command: "no class-map <class-map-name>"

- id: rename_new_class_map_name
  label: "Rename <New-Class-Map-Name>"
  kind: action
  command: "rename <new-class-map-name>"

- id: match_any
  label: "Match Any"
  kind: action
  command: "match any"

- id: match_class_map_refclassname
  label: "Match Class-Map <Refclassname>"
  kind: action
  command: "match class-map <refclassname>"

- id: match_class_map_refclassname_2
  label: "No Match Class-Map <Refclassname>"
  kind: action
  command: "no match class-map <refclassname>"

- id: match_cos_0_7
  label: "Match Cos <0-7>"
  kind: action
  command: "match cos <0-7>"

- id: match_destination_address_mac_address_mac
  label: "Match Destination-Address Mac <Address> <Mac-Mask>"
  kind: action
  command: "match destination-address mac <address> <mac-mask>"

- id: match_dstip_ipaddr_ipmask
  label: "Match Dstip <Ipaddr> <Ipmask>"
  kind: action
  command: "match dstip <ipaddr> <ipmask>"

- id: match_dstl4port_port_key_0_65535
  label: "Match Dstl4Port {<Port-Key> | <0-65535>}"
  kind: action
  command: "match dstl4port {<port-key> | <0-65535>}"

- id: match_ethertype_keyword_0x0600_0xffff
  label: "Match Ethertype {<Keyword> | <0X0600-0Xffff>}"
  kind: action
  command: "match ethertype {<keyword> | <0x0600-0xFFFF>}"

- id: match_ip_dscp_value
  label: "Match Ip Dscp <Value>"
  kind: action
  command: "match ip dscp <value>"

- id: match_ip_precedence_0_7
  label: "Match Ip Precedence <0-7>"
  kind: action
  command: "match ip precedence <0-7>"

- id: match_ip_tos_tosbits_tosmask
  label: "Match Ip Tos <Tosbits> <Tosmask>"
  kind: action
  command: "match ip tos <tosbits> <tosmask>"

- id: match_protocol_protocol_name_0_255
  label: "Match Protocol {<Protocol-Name> | <0-255>}"
  kind: action
  command: "match protocol {<protocol-name> | <0-255>}"

- id: match_source_address_mac_address_macmask
  label: "Match Source-Address Mac <Address> <Macmask>"
  kind: action
  command: "match source-address mac <address> <macmask>"

- id: match_srcip_ipaddr_ipmask
  label: "Match Srcip <Ipaddr> <Ipmask >"
  kind: action
  command: "match srcip <ipaddr> <ipmask >"

- id: match_srcl4port_port_key_0_65535
  label: "Match Srcl4Port {<Port-Key> | <0-65535>}"
  kind: action
  command: "match srcl4port {<port-key> | <0-65535>}"

- id: match_vlan_1_4093
  label: "Match Vlan <1-4093>"
  kind: action
  command: "match vlan <1-4093>"

- id: assign_queue_0_7
  label: "Assign-Queue <0-7>"
  kind: action
  command: "assign-queue <0-7>"

- id: drop
  label: "Drop"
  kind: action
  command: "drop"

- id: mirror_slot_port_port_channel_port
  label: "Mirror {<Slot/Port> | Port-Channel <Port-Channel-Intf-Num>}"
  kind: action
  command: "mirror {<slot/port> | port-channel <port-channel-intf-num>}"

- id: redirect_slot_port_port_channel_port
  label: "Redirect {<Slot/Port> | Port-Channel <Port-Channel-Intf-Num>}"
  kind: action
  command: "redirect {<slot/port> | port-channel <port-channel-intf-num>}"

- id: conform_color_class_map_name
  label: "Conform-Color <Class-Map-Name>"
  kind: action
  command: "conform-color <class-map-name>"

- id: mark_cos_0_7
  label: "Mark Cos <0-7>"
  kind: action
  command: "mark cos <0-7>"

- id: class_classname
  label: "No Class <Classname>"
  kind: action
  command: "no class <classname>"

- id: mark_ip_dscp_value
  label: "Mark Ip-Dscp <Value>"
  kind: action
  command: "mark ip-dscp <value>"

- id: mark_ip_precedence_0_7
  label: "Mark Ip-Precedence <0-7>"
  kind: action
  command: "mark ip-precedence <0-7>"

- id: police_single_rate_1_4294967295_1
  label: "Police-Single-Rate {<1-4294967295> <1-128> <1-128> Conform-Action"
  kind: action
  command: "police-single-rate {<1-4294967295> <1-128> <1-128> conform-action {drop | set-cos-as-sec-cos | set-cos-transmit <0-7> | set-dscp-transmit <value> | set-prec-transmit <0-7> | transmit} exceed-action { drop | set-cos-as-sec-cos | set-cos-transmit <0-7> | set-dscp-transmit <value> | set-prec-transmit <0-7> | transmit} [violate-action { drop | set-cos-as-sec-cos | set-cos-transmit <0-7> | set-dscp-transmit <value> | set-prec-transmit <0-7> | transmit }]}"

- id: police_two_rate_1_4294967295_1
  label: "Police-Two-Rate {<1-4294967295> <1-128> <1-4294967295> <1-128>"
  kind: action
  command: "police-two-rate {<1-4294967295> <1-128> <1-4294967295> <1-128> conform-action {drop | set-cos-as-sec-cos | set-cos-transmit <0-7> | set-dscp-transmit <value> | set-prec-transmit <07> | transmit} exceed-action { drop | set-cos-as-sec-cos | set-cos-transmit <0-7> | set-dscptransmit <value> | set-prec-transmit <0-7> | transmit } [violate-action { drop | set-cos-as-seccos | set-cos-transmit <0-7> | set-dscp-transmit <value> | set-prec-transmit <0-7> | transmit}]}"

- id: policy_map_policyname_in_out
  label: "Policy-Map <Policyname> [{In | Out}]"
  kind: action
  command: "policy-map <policyname> [{in | out}]"

- id: policy_map_rename_policyname_newpolicyname
  label: "Policy-Map Rename <Policyname> <Newpolicyname>"
  kind: action
  command: "policy-map rename <policyname> <newpolicyname>"

- id: service_policy_in_out_policy_map
  label: "Service-Policy {In | Out} <Policy-Map-Name>"
  kind: action
  command: "service-policy {in | out} <policy-map-name>"

- id: service_policy_in_out_policy_map_2
  label: "No Service-Policy {In | Out}"
  kind: action
  command: "no service-policy {in | out} <policy-map-name>"

- id: show_class_map_classname
  label: "Show Class-Map [<Classname>]"
  kind: query
  command: "show class-map [<classname>]"

- id: show_diffserv
  label: "Show Diffserv"
  kind: query
  command: "show diffserv"

- id: show_diffserv_service_slot_port_in
  label: "Show Diffserv Service <Slot/Port> {In"
  kind: query
  command: "show diffserv service <slot/port> {in | out}"

- id: show_diffserv_service_brief_in_out
  label: "Show Diffserv Service Brief [In"
  kind: query
  command: "show diffserv service brief [in | out]"

- id: show_policy_map_policy_map_name
  label: "Show Policy-Map [<Policy-Map-Name>]"
  kind: query
  command: "show policy-map [<policy-map-name>]"

- id: show_policy_map_interface_slot_port
  label: "Show Policy-Map Interface {<Slot/Port> |"
  kind: query
  command: "show policy-map interface {<slot/port> | port-channel <1-64 >} {in | out}"

- id: show_service_policy_in_out
  label: "Show Service-Policy {In | Out}"
  kind: query
  command: "show service-policy {in | out}"

- id: show_mac_access_lists_name
  label: "Show Mac Access-Lists <Name>"
  kind: query
  command: "show mac access-lists <name>"

- id: show_mac_access_lists
  label: "Show Mac Access-Lists"
  kind: query
  command: "show mac access-lists"

- id: show_ip_access_lists_1_199
  label: "Show Ip Access-Lists [<1-199> |"
  kind: query
  command: "show ip access-lists [<1-199> | <name>]"

- id: show_access_lists_interface_slot_port
  label: "Show Access-Lists Interface { {"
  kind: query
  command: "show access-lists interface { { {<slot/port> | port-channel <1-64> } in | out } | control-plane }"

- id: show_access_lists_vlan_vlan_id
  label: "Show Access-Lists Vlan <Vlan-Id> {In"
  kind: query
  command: "show access-lists vlan <vlan-id> {in | out}"

- id: mac_access_list_extended_name
  label: "Mac Access-List Extended <Name>"
  kind: action
  command: "[no] mac access-list extended <name>"

- id: mac_access_list_extended_rename_oldname
  label: "Mac Access-List Extended Rename <Oldname>"
  kind: action
  command: "mac access-list extended rename <oldname> <newname>"

- id: mac_access_list_resequence_name_1
  label: "Mac Access-List Resequence {<Name>} <1-2147483647>"
  kind: action
  command: "mac access-list resequence {<name>} <1-2147483647> <1-2147483647>"

- id: 1_2147483647_deny_permit_srcmac_srcmask
  label: "[1-2147483647] {Deny | Permit} {{<Srcmac>"
  kind: action
  command: "[1-2147483647] {deny | permit} {{<srcmac> <srcmask>} | any} {{<dstmac> <dstmask>} | any | bpdu} [<ethertypekey> | <0x0600-0xFFFF>] [vlan {{eq <0-4095>}} [ cos <0-7>] [log] [time-range time-range-name] [assign-queue <queue-id>] [{mirror | redirect} {<slot/port> | port-channel <portchannel-id>}] [<rule-id>]"

- id: remark_remark
  label: "Remark <Remark>"
  kind: action
  command: "[no] remark <remark>"

- id: mac_access_group_name_vlan_vlan
  label: "Mac Access-Group <Name> [Vlan <Vlan-Id>]"
  kind: action
  command: "mac access-group <name> [vlan <vlan-id>] {in |out} [<1-4294967295>]"

- id: ip_access_list_name
  label: "Ip Access-List <Name>"
  kind: action
  command: "[no] ip access-list <name>"

- id: ip_access_list_rename_oldname_newname
  label: "Ip Access-List Rename <Oldname> <Newname>"
  kind: action
  command: "ip access-list rename <oldname> <newname>"

- id: ip_access_list_resequence_name_id
  label: "Ip Access-List Resequence {Name |"
  kind: action
  command: "ip access-list resequence {name | id } <1-2147483647> <1-2147483647>"

- id: access_list_1_99_100_199
  label: "No Access-List {<1-99> | <100-199>}"
  kind: action
  command: "no access-list {<1-99> | <100-199>} [<rule-id>]"

- id: ip_access_group_1_199_name
  label: "Ip Access-Group {<1-199> | <Name>}"
  kind: action
  command: "ip access-group {<1-199> | <name>} [vlan <vlan-id>] {in | out} [<1-4294967295>]"

- id: ip_access_group_1_199_name_2
  label: "No Ip Access-Group {<1-199> |"
  kind: action
  command: "no ip access-group {<1-199> | <name>} [vlan <vlan-id>] {in | out}"

- id: show_ipv6_access_lists_name
  label: "Show Ipv6 Access-Lists [<Name>]"
  kind: query
  command: "show ipv6 access-lists [<name>]"

- id: ipv6_access_list_name
  label: "Ipv6 Access-List <Name>"
  kind: action
  command: "ipv6 access-list <name>"

- id: ipv6_access_list_rename_oldname_newname
  label: "Ipv6 Access-List Rename <Oldname> <Newname>"
  kind: action
  command: "ipv6 access-list rename <oldname> <newname>"

- id: ipv6_traffic_filter_name_control_plane
  label: "Ipv6 Traffic-Filter <Name> {{Control-Plane |"
  kind: action
  command: "ipv6 traffic-filter <name> {{control-plane | in | out} | vlan <vlan-id> {in | out}} [<1-4294967295>]"

- id: cos_queue_strict_0_7_0
  label: "Cos-Queue Strict <0-7> <0-7>"
  kind: action
  command: "cos-queue strict <0-7> <0-7>"

- id: cos_queue_min_bandwidth_bw_0
  label: "Cos-Queue Min-Bandwidth <Bw-0> <Bw-1> …"
  kind: action
  command: "cos-queue min-bandwidth <bw-0> <bw-1> … <bw-7>"

- id: cos_queue_strict_queue_id_0
  label: "Cos-Queue Strict <Queue-Id-0> [<Queue-Id-1> …"
  kind: action
  command: "cos-queue strict <queue-id-0> [<queue-id-1> … <queue-id-7>]"

- id: show_hosts
  label: "Show Hosts"
  kind: query
  command: "show hosts"

- id: ip_host_name_ipaddr
  label: "Ip Host <Name> <Ipaddr>"
  kind: action
  command: "ip host <name> <ipaddr>"

- id: ip_host_name_global_config
  label: "No Ip Host <Name> Mode"
  kind: action
  command: "no ip host <name> Mode Global Config"

- id: clear_host_hostname_all
  label: "Clear Host <Hostname | All>"
  kind: action
  command: "clear host <hostname | all>"

- id: ip_domainname_name
  label: "Ip Domainname <Name>"
  kind: action
  command: "ip domainname <name>"

- id: ip_domainname_name_global_config
  label: "No Ip Domainname <Name> Mode"
  kind: action
  command: "no ip domainname <name> Mode Global Config"

- id: ip_domainlist_name
  label: "Ip Domainlist <Name>"
  kind: action
  command: "ip domainlist <name>"

- id: ip_name_server_ipaddr
  label: "Ip Name-Server <Ipaddr>"
  kind: action
  command: "ip name-server <ipaddr>"

- id: ip_name_server_ipaddr_2
  label: "No Ip Name-Server <Ipaddr>"
  kind: action
  command: "no ip name-server <ipaddr>"

- id: ip_name_server_server_address1_server
  label: "Ip Name Server { Server-Address1"
  kind: action
  command: "ip name server { server-address1 …server-address8}"

- id: ip_name_server_source_interface
  label: "No Ip Name Server Source-Interface"
  kind: action
  command: "no ip name server source-interface"

- id: ip_domain_lookup
  label: "Ip Domain Lookup"
  kind: action
  command: "ip domain lookup"

- id: ip_domain_lookup_global_config
  label: "No Ip Domain Lookup Mode"
  kind: action
  command: "no ip domain lookup Mode Global Config"

- id: ip_domainretry_0_100
  label: "Ip Domainretry <0-100>"
  kind: action
  command: "ip domainretry <0-100>"

- id: ip_domainretry
  label: "No Ip Domainretry"
  kind: action
  command: "no ip domainretry"

- id: ip_domain_timeout_0_3600
  label: "Ip Domain Timeout <0-3600>"
  kind: action
  command: "ip domain timeout <0-3600>"

- id: ip_domain_timeout
  label: "No Ip Domain Timeout"
  kind: action
  command: "no ip domain timeout"

- id: clock_summer_time_date_date_month
  label: "Clock Summer-Time Date {<Date> <Month>"
  kind: action
  command: "clock summer-time date {<date> <month> <year> <hh:mm> <date> <month> <year> <hh:mm>} [offset <offset>] [zone <acronym>]"

- id: clock_summer_time_recurring_week_day
  label: "Clock Summer-Time Recurring {<Week> <Day>"
  kind: action
  command: "clock summer-time recurring {<week> <day> <month> <hh:mm> <week> <day> <month> <hh:mm> | <EU> | <USA>} [offset <offset>] [zone <acronym>]"

- id: clock_summer_time
  label: "No Clock Summer-Time"
  kind: action
  command: "no clock summer-time"

- id: clock_timezone_hours_minutes_minutes_zone_2
  label: "Clock Timezone {Hours} [Minutes <Minutes>]"
  kind: action
  command: "clock timezone {hours} [minutes <minutes>] [zone <acronym>]"

- id: show_arp
  label: "Show Arp"
  kind: query
  command: "show arp"

- id: show_arp_brief
  label: "Show Arp Brief"
  kind: query
  command: "show arp brief"

- id: show_arp_switch
  label: "Show Arp Switch"
  kind: query
  command: "show arp switch"

- id: arp_ipaddr_macaddr
  label: "Arp <Ipaddr> <Macaddr>"
  kind: action
  command: "arp <ipaddr> <macaddr>"

- id: arp_cachesize_1152_8192_or_arp
  label: "Arp Cachesize <1152-8192> Or Arp"
  kind: action
  command: "arp cachesize <1152-8192> or arp cachesize <1152-6144>"

- id: arp_dynamicrenew
  label: "Arp Dynamicrenew"
  kind: action
  command: "arp dynamicrenew"

- id: arp_resptime_1_10
  label: "Arp Resptime <1-10>"
  kind: action
  command: "arp resptime <1-10>"

- id: arp_retries_0_10
  label: "Arp Retries <0-10>"
  kind: action
  command: "arp retries <0-10>"

- id: arp_timeout_15_21600
  label: "Arp Timeout <15-21600>"
  kind: action
  command: "arp timeout <15-21600>"

- id: clear_arp_cache_gateway_interface_slot
  label: "Clear Arp-Cache [Gateway | Interface"
  kind: action
  command: "clear arp-cache [gateway | interface {<slot/port> | vlan <vlan-id>}]"

- id: show_ip_brief
  label: "Show Ip Brief"
  kind: query
  command: "show ip brief"

- id: show_ip_interface_slot_port
  label: "Show Ip Interface <Slot/Port>"
  kind: query
  command: "show ip interface <slot/port>"

- id: show_ip_interface_vlan_1_4093
  label: "Show Ip Interface Vlan <1-4093>"
  kind: query
  command: "show ip interface vlan <1-4093> Default None Mode Privileged EXEC User EXEC"

- id: show_ip_interface_brief
  label: "Show Ip Interface Brief"
  kind: query
  command: "show ip interface brief"

- id: show_ip_route_connected
  label: "Show Ip Route Connected"
  kind: query
  command: "show ip route connected"

- id: show_ip_route_static_all
  label: "Show Ip Route Static [All]"
  kind: query
  command: "show ip route static [all]"

- id: show_ip_route_hw_failure
  label: "Show Ip Route Hw-Failure"
  kind: query
  command: "show ip route hw-failure"

- id: show_ip_route_summary_all
  label: "Show Ip Route Summary [All]"
  kind: query
  command: "show ip route summary [all]"

- id: clear_ip_route_counters
  label: "Clear Ip Route Counters"
  kind: action
  command: "clear ip route counters"

- id: show_ip_stats
  label: "Show Ip Stats"
  kind: query
  command: "show ip stats"

- id: show_routing_heap_summary
  label: "Show Routing Heap Summary"
  kind: query
  command: "show routing heap summary"

- id: routing
  label: "Routing"
  kind: action
  command: "routing"

- id: ip_address_ipaddr_subnet_mask_prefix
  label: "Ip Address <Ipaddr> {<Subnet-Mask> |"
  kind: action
  command: "ip address <ipaddr> {<subnet-mask> | <prefix-lengh>} [secondary]"

- id: ip_address_dhcp_restart_client_id
  label: "Ip Address Dhcp {[Restart] |"
  kind: action
  command: "ip address dhcp {[restart] | [client-id]}"

- id: ip_gateway_ipaddr
  label: "Ip Default-Gateway <Ipaddr>"
  kind: action
  command: "ip default-gateway <ipaddr>"

- id: ip_route_networkaddr_subnetmask_nexthopip_null0
  label: "Ip Route <Networkaddr> <Subnetmask> [{<Nexthopip>"
  kind: action
  command: "ip route <networkaddr> <subnetmask> [{<nexthopip> | Null0} {{[<1-255 >] description <description>} | description <description>}]"

- id: ip_route_nexthopip_1_255
  label: "Ip Route Default <Nexthopip> [1-255]"
  kind: action
  command: "ip route default <nexthopip> [1-255]"

- id: ip_route_distance_1_255
  label: "Ip Route Distance <1-255>"
  kind: action
  command: "ip route distance <1-255>"

- id: ip_mtu_68_9198_ip_mtu
  label: "Ip Mtu <68- 9198 >"
  kind: action
  command: "ip mtu <68- 9198 > no ip mtu <68- 9198 >"

- id: encapsulation_ethernet_snap
  label: "Encapsulation {Ethernet | Snap}"
  kind: action
  command: "encapsulation {ethernet | snap}"

- id: interface_vlan_vlan_id_2
  label: "Interface Vlan <Vlan-Id>"
  kind: action
  command: "interface vlan <vlan-id>"

- id: show_ip_igmp
  label: "Show Ip Igmp"
  kind: query
  command: "show ip igmp"

- id: show_ip_igmp_groups_slot_port
  label: "Show Ip Igmp Groups {<Slot/Port>"
  kind: query
  command: "show ip igmp groups {<slot/port> | vlan <vlan-id>} [detail]"

- id: show_ip_igmp_interface_slot_port
  label: "Show Ip Igmp Interface {<Slot/Port>"
  kind: query
  command: "show ip igmp interface {<slot/port> | vlan <vlan-id>}"

- id: show_ip_igmp_interface_membership_multiipaddr
  label: "Show Ip Igmp Interface Membership"
  kind: query
  command: "show ip igmp interface membership <multiipaddr> [detail]"

- id: show_ip_igmp_interface_stats_slot
  label: "Show Ip Igmp Interface Stats"
  kind: query
  command: "show ip igmp interface stats {<slot/port> | vlan <vlan-id>}"

- id: ip_igmp_last_member_query_count
  label: "Ip Igmp Last-Member-Query-Count <1-20>"
  kind: action
  command: "ip igmp last-member-query-count <1-20>"

- id: show_ip_pim
  label: "Show Ip Pim"
  kind: query
  command: "show ip pim"

- id: show_ip_pim_bsr_router_candidate
  label: "Show Ip Pim Bsr-Router {Candidate"
  kind: query
  command: "show ip pim bsr-router {candidate | elected}"

- id: show_ip_pim_interface_slot_port
  label: "Show Ip Pim Interface [{<Slot/Port>"
  kind: query
  command: "show ip pim interface [{<slot/port> | vlan <vlan-id>}]"

- id: show_ip_pim_neighbor_slot_port
  label: "Show Ip Pim Neighbor [{<Slot/Port>"
  kind: query
  command: "show ip pim neighbor [{<slot/port> | vlan <vlan-id>}]"

- id: show_ip_pim_rp_mapping_rp
  label: "Show Ip Pim Rp Mapping"
  kind: query
  command: "show ip pim rp mapping [{<rp-address> | candidate | static}]"

- id: show_ip_pim_rp_hash_group
  label: "Show Ip Pim Rp-Hash <Group-Address>"
  kind: query
  command: "show ip pim rp-hash <group-address>"

- id: show_ip_pim_ssm
  label: "Show Ip Pim Ssm"
  kind: query
  command: "show ip pim ssm"

- id: show_ip_pim_statistics_slot_port
  label: "Show Ip Pim Statistics [{<Slot/Port>"
  kind: query
  command: "show ip pim statistics [{<slot/port> | vlan <vlan-id>}]"

- id: ip_pim_bsr_candidate_interface_slot
  label: "Ip Pim Bsr-Candidate Interface {<Slot/Port>"
  kind: action
  command: "ip pim bsr-candidate interface {<slot/port> | vlan <vlan-id>} <hash-masklength> [<priority>] [interval <1-16383>]"

- id: ip_pim_rp_address_rp_address
  label: "Ip Pim Rp-Address <Rp-Address> <Group-Address>"
  kind: action
  command: "ip pim rp-address <rp-address> <group-address> <group-mask> [override] no ip pim rp-address <rp-address> <group-address> <group-mask>"

- id: ip_pim
  label: "Ip Pim"
  kind: action
  command: "ip pim"

- id: ip_pim_bsr_border
  label: "Ip Pim Bsr-Border"
  kind: action
  command: "ip pim bsr-border"
```

Actions enumerate every distinct `Format:` command row in the source *Command Line Interface Guide* (761 entries). `kind: query` marks read/status commands (show, dir, script list/show/validate, ping, traceroute are action-classified diagnostics). `kind: action` marks mutating/configuration/clear/control commands including their `[no]`-prefixed and `no <x>` negation forms where the source lists them as distinct rows. `command:` carries the payload verbatim from the source (markdown bold/italic/backtick markup stripped); angle-bracket and brace tokens denote parameters per the source's CLI notation.

## Feedbacks
```yaml
feedbacks:
  - id: interface_link_status
    type: enum
    values:
      - up
      - down
    source: show interfaces status
  - id: port_admin_mode
    type: enum
    values:
      - enabled
      - disabled
    source: show interfaces status
  - id: poe_port_info
    type: object
    source: show poe port info
```

<!-- UNRESOLVED: the source exposes many additional observable fields via show commands (CPU utilization, event log, port counters, STP state, PoE budget, VLAN tables, etc.); only a representative subset is enumerated above. Response payload schemas are not formally specified in the source. -->

## Variables
```yaml
variables: []
```

All settable parameters in the source are expressed as discrete CLI commands captured under Actions (e.g. `mtu`, `serial baudrate`, `spanning-tree forward-time`, `poe power limit`, `sntp unicast client poll-interval`). No separate non-command variable surface is documented.

## Events
```yaml
events:
  - id: snmp_link_status_trap
    description: Link status change SNMP trap
  - id: snmp_multiusers_trap
    description: Multiple-user login SNMP trap
  - id: snmp_stp_trap
    description: Spanning Tree SNMP trap
  - id: snmp_violation_trap
    description: Security violation SNMP trap
```

<!-- UNRESOLVED: trap payload format and OID bindings are not specified in this CLI guide; the source only documents enable/disable configuration (snmp-server enable traps ...). -->

## Macros
```yaml
macros: []
```

The source documents a script subsystem (`script apply <scriptname>`, `script validate`, `.scr` files, running-config capture to script) which acts as a user-defined macro facility, but no fixed multi-step sequences are prescribed verbatim in the source.

<!-- UNRESOLVED: no canned macro sequences defined in source; scripts are operator-authored. -->

## Safety
```yaml
confirmation_required_for:
  - reload
  - erase startup-config
  - erase factory-defaults
  - clear config
  - clear pass
  - delete backup
  - copy active backup
  - copy backup active
interlocks: []
```

The listed commands are explicitly documented as device/config reset, factory-default, credential-clear, image-swap, or reboot operations (source sections 3.17 / System Utilities). No hardware interlock or power-on sequencing procedures are described in this CLI guide.

<!-- UNRESOLVED: no electrical/voltage/current specifications in this document (it is a CLI guide, not a hardware datasheet). -->
<!-- UNRESOLVED: no fault-recovery or error-handling sequences specified in source. -->

## Notes
- Product is a Pakedge-manufactured Layer 3 switch rebadged by Control4; CLI prompts in the source read `Pakedge-MS-1212-...` and the management platform is OvrC.
- Console port is an RS-232 DCE, 9-pin D-shell "Diagnostics" port; default serial rate is 115200 (configurable via `serial baudrate`).
- Telnet default port is 23; SSH is supported but its listener port is not stated.
- The device has no IP address by default; DHCP client is enabled on the network VLAN.
- Command notation: `<param>` = mandatory, `[param]` = optional, `{a | b}` = required choice, `!` begins a comment line.
<!-- UNRESOLVED: protocol/CLI version number not stated as a compatibility range in source. -->
<!-- UNRESOLVED: binary/byte-level encoding N/A — this is an ASCII text CLI; no hex command tables in source. -->

## Provenance

```yaml
source_domains:
  - docs.control4.com
source_urls:
  - https://docs.control4.com/docs/product/ms-series-pakedge-cloud-managed-switches/all-dealer-command-line-interface-guide/english/latest/ms-series-pakedge-cloud-managed-switches-command-line-interface-guide-rev-b.pdf
  - https://docs.control4.com/docs/product/ms-series-pakedge-cloud-managed-switches/user-guide/english/revision/A/ms-series-pakedge-cloud-managed-switches-user-guide-rev-a.pdf
  - https://docs.control4.com/
retrieved_at: 2026-08-11T05:54:59.928Z
last_checked_at: 2026-08-19T09:13:02.499Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:13:02.499Z
matched_actions: 761
action_count: 761
confidence: medium
summary: "All 761 spec actions have a whitespace-collapsed literal match against source Format lines; transport (port 23, 115200-8-N-1, password) verified. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no shutdown"
- "no shutdown all"
- "ip routing"
- "ip pim sparse"
- "ip pim dr-priority"
- "ip pim hello-interval"
- "ip pim join-prune-interval"
- "ip pim rp-candidate"
- "ip pim bsr-border"
- "ip igmp"
- "ip igmp last-member-query-interval"
- "ip igmp query-interval"
- "firmware version compatibility not stated in source (show version reports a runtime version string per unit, no compatibility matrix)."
- "SSH TCP port not stated in source (only Telnet port 23 is explicit)."
- "OvrC cloud / SNMP are documented management surfaces but their wire protocol is out of scope for this CLI guide."
- "the source exposes many additional observable fields via show commands (CPU utilization, event log, port counters, STP state, PoE budget, VLAN tables, etc.); only a representative subset is enumerated above. Response payload schemas are not formally specified in the source."
- "trap payload format and OID bindings are not specified in this CLI guide; the source only documents enable/disable configuration (snmp-server enable traps ...)."
- "no canned macro sequences defined in source; scripts are operator-authored."
- "no electrical/voltage/current specifications in this document (it is a CLI guide, not a hardware datasheet)."
- "no fault-recovery or error-handling sequences specified in source."
- "protocol/CLI version number not stated as a compatibility range in source."
- "binary/byte-level encoding N/A — this is an ASCII text CLI; no hex command tables in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
