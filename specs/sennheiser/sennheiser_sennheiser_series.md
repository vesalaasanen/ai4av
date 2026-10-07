---
spec_id: admin/sennheiser-ssc-dw-family
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sennheiser SpeechLine DW / CHG 2N-4N SSC Control Spec"
manufacturer: Sennheiser
model_family: "SL Rack Receiver DW"
aliases: []
compatible_with:
  manufacturers:
    - Sennheiser
    - "Sennheiser electronic GmbH & Co. KG"
  models:
    - "SL Rack Receiver DW"
    - "SL MCR 2 DW"
    - "SL MCR 4 DW"
    - "CHG 2N"
    - "CHG 4N"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.sennheiser.com
source_urls:
  - https://assets.sennheiser.com/download/assets/TI_1094_v4.3_Sennheiser_Sound_Control_Protocol_SL_DW_EN.pdf/b2a3c92ce7bb11f088db768ee8e97aea
retrieved_at: 2026-09-02T16:50:03.491Z
last_checked_at: 2026-10-07T22:08:20.812Z
generated_at: 2026-10-07T22:08:20.812Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device-specific differences (e.g. rx1..rx4 channel enumeration on 4-channel variant, mute_mode enum variants) are described in prose but not enumerated here."
  - "source does not describe named multi-step macros"
  - "source does not document electrical/firmware-safety interlocks, voltage/current specs, or operator-visible hazard warnings."
  - "device firmware version compatibility across the three device groups not stated. Voltage/current/power specifications not stated. Authentication credentials or token formats: none documented."
verification:
  verdict: verified
  checked_at: 2026-10-07T22:08:20.812Z
  matched_actions: 189
  action_count: 189
  confidence: medium
  summary: "All 189 action units match source SSC methods across Rack, MCR and CHG sections, and port 45, UDP and DNS-SD are stated; no omitted methods found. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Sennheiser SpeechLine DW / CHG 2N-4N SSC Control Spec

## Summary
Control spec for the Sennheiser SpeechLine DW wireless microphone receivers (SL Rack Receiver DW, SL MCR 2 DW, SL MCR 4 DW) and battery chargers (CHG 2N, CHG 4N) via the Sennheiser Sound Control Protocol (SSC), a JSON-over-UDP/IP protocol modeled on OSC address paths. All listed devices implement SSC exclusively over UDP/IP (IPv4 and IPv6); TCP is not implemented. Service discovery uses DNS-SD under `_ssc._udp`. This spec covers the method catalogue for the three device groups as documented in the SSC protocol guide.

<!-- UNRESOLVED: device-specific differences (e.g. rx1..rx4 channel enumeration on 4-channel variant, mute_mode enum variants) are described in prose but not enumerated here. -->

## Transport
```yaml
protocols:
  - udp
addressing:
  port: 45  # default UDP port per SSC §6.1; actual port discovered via DNS-SD
discovery:
  protocol: dns-sd
  service_type: _ssc._udp
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure documented in source)
```

## Traits
```yaml
- queryable       # inferred from query-style methods (null-argument getters)
- levelable       # inferred from /audio/out*/gain_db and /audio/*/mixer/gain commands
- routable        # inferred from /rx*/mute_mode, /audio/*/equalizer/preset selections
```

## Actions
```yaml
- id: interface_version_query
  label: SSC Interface Version (query)
  kind: query
  command: '{"interface":{"version":null}}'
  params: []
- id: osc_xid
  label: OSC Transaction ID Echo
  kind: action
  command: '{"osc":{"xid":<xid>}}'
  params:
    - name: xid
      type: integer
      description: Transaction ID echoed back by server
- id: osc_version_query
  label: SSC Version (query)
  kind: query
  command: '{"osc":{"version":null}}'
  params: []
- id: osc_schema_root_query
  label: Address Schema Root (query)
  kind: query
  command: '{"osc":{"schema":null}}'
  params: []
- id: osc_schema_subtree_query
  label: Address Schema Subtree (query)
  kind: query
  command: '{"osc":{"schema":[{"<subtree>":null}]}}'
  params:
    - name: subtree
      type: string
      description: Schema subtree path to query
- id: osc_limits_query
  label: Parameter Limits (query)
  kind: query
  command: '{"osc":{"limits":[{"<address>":null}]}}'
  params:
    - name: address
      type: string
      description: Address whose parameter limits are being queried
- id: osc_feature_pattern_query
  label: Feature: Pattern Matching (query)
  kind: query
  command: '{"osc":{"feature":{"pattern":null}}}'
  params: []
- id: osc_feature_baseaddr_query
  label: Feature: Base Address (query)
  kind: query
  command: '{"osc":{"feature":{"baseaddr":null}}}'
  params: []
- id: osc_feature_subscription_query
  label: Feature: Subscription (query)
  kind: query
  command: '{"osc":{"feature":{"subscription":null}}}'
  params: []
- id: osc_feature_timetag_query
  label: Feature: Timetag (query)
  kind: query
  command: '{"osc":{"feature":{"timetag":null}}}'
  params: []
- id: osc_state_subscribe
  label: Subscribe to Address Changes
  kind: action
  command: '{"osc":{"state":{"subscribe":[{"#":{"lifetime":<seconds>},"<address>":null}]}}}'
  params:
    - name: seconds
      type: integer
      description: Subscription lifetime in seconds (default 10)
    - name: address
      type: string
      description: Address pattern to subscribe to
- id: osc_state_subscribe_cancel
  label: Cancel Subscription
  kind: action
  command: '{"osc":{"state":{"subscribe":[{"#":{"cancel":true},"<address>":null}]}}}'
  params:
    - name: address
      type: string
      description: Address pattern to cancel
- id: osc_state_close
  label: Close Connection
  kind: action
  command: '{"osc":{"state":{"close":true}}}'
  params: []
- id: osc_state_prettyprint_set
  label: Set Prettyprint Mode
  kind: action
  command: '{"osc":{"state":{"prettyprint":<bool>}}}'
  params:
    - name: bool
      type: boolean
      description: true = formatted, false = compact
- id: osc_state_prettyprint_query
  label: Prettyprint Mode (query)
  kind: query
  command: '{"osc":{"state":{"prettyprint":null}}}'
  params: []
- id: osc_ping
  label: Ping (MCR DW only)
  kind: action
  command: '{"osc":{"ping":null}}'
  params: []

- id: device_name_set
  label: Set Device Name
  kind: action
  command: '{"device":{"name":"<name>"}}'
  params:
    - name: name
      type: string
      description: up to 29 characters (MCR), reduced charset
- id: device_name_query
  label: Device Name (query)
  kind: query
  command: '{"device":{"name":null}}'
  params: []
- id: device_dante_name_set
  label: Set Dante Name (MCR DW)
  kind: action
  command: '{"device":{"dante":{"name":"<name>"}}}'
  params:
    - name: name
      type: string
      description: Up to 16 characters
- id: device_group_set
  label: Set Group Name
  kind: action
  command: '{"device":{"group":"<group>"}}'
  params:
    - name: group
      type: string
      description: 1-8 chars, reduced charset
- id: device_group_query
  label: Group Name (query)
  kind: query
  command: '{"device":{"group":null}}'
  params: []
- id: device_location_set
  label: Set Location
  kind: action
  command: '{"device":{"location":"<loc>"}}'
  params:
    - name: loc
      type: string
      description: Free-text location
- id: device_location_query
  label: Location (query)
  kind: query
  command: '{"device":{"location":null}}'
  params: []
- id: device_position_set
  label: Set Position (MCR DW)
  kind: action
  command: '{"device":{"position":"<pos>"}}'
  params:
    - name: pos
      type: string
      description: Free-text position
- id: device_position_query
  label: Position (query)
  kind: query
  command: '{"device":{"position":null}}'
  params: []
- id: device_system_set
  label: Set System Name (MCR DW)
  kind: action
  command: '{"device":{"system":"<name>"}}'
  params:
    - name: name
      type: string
      description: System name
- id: device_system_query
  label: System Name (query)
  kind: query
  command: '{"device":{"system":null}}'
  params: []
- id: device_language_query
  label: Language (query)
  kind: query
  command: '{"device":{"language":null}}'
  params: []
- id: device_identity_product_query
  label: Product Identity (query)
  kind: query
  command: '{"device":{"identity":{"product":null}}}'
  params: []
- id: device_identity_version_query
  label: Firmware Version (query)
  kind: query
  command: '{"device":{"identity":{"version":null}}}'
  params: []
- id: device_identity_serial_query
  label: Device Serial (query)
  kind: query
  command: '{"device":{"identity":{"serial":null}}}'
  params: []
- id: device_identity_vendor_query
  label: Vendor Name (query)
  kind: query
  command: '{"device":{"identity":{"vendor":null}}}'
  params: []
- id: device_identification_visual
  label: Trigger Visual Identification (MCR DW)
  kind: action
  command: '{"device":{"identification":{"visual":true}}}'
  params: []
- id: device_led_brightness_set
  label: Set LED Brightness (MCR DW)
  kind: action
  command: '{"device":{"led":{"brightness":<0..5>}}}'
  params:
    - name: level
      type: integer
      description: 0-5 integer brightness level
- id: device_led_brightness_query
  label: LED Brightness (query)
  kind: query
  command: '{"device":{"led":{"brightness":null}}}'
  params: []
- id: device_network_ether_interfaces_query
  label: Ethernet Interfaces (query)
  kind: query
  command: '{"device":{"network":{"ether":{"interfaces":null}}}}'
  params: []
- id: device_network_ether_macs_query
  label: Ethernet MAC Addresses (query)
  kind: query
  command: '{"device":{"network":{"ether":{"macs":null}}}}'
  params: []
- id: device_network_interface_mapping_set
  label: Set Network Interface Mapping (MCR DW)
  kind: action
  command: '{"device":{"network":{"interface_mapping":"<CONFIG1|CONFIG2|CONFIG3>"}}}'
  params:
    - name: mode
      type: string
      description: CONFIG1=Single cable, CONFIG2=Audio redundancy, CONFIG3=Split
- id: device_network_interface_mapping_query
  label: Interface Mapping (query)
  kind: query
  command: '{"device":{"network":{"interface_mapping":null}}}'
  params: []
- id: device_network_ipv4_auto_set
  label: Set IPv4 Auto (DHCP)
  kind: action
  command: '{"device":{"network":{"ipv4":{"auto":[<bool>]}}}}'
  params:
    - name: bool
      type: boolean
      description: true=DHCP/Auto-IP, false=manual
- id: device_network_ipv4_auto_query
  label: IPv4 Auto Config (query)
  kind: query
  command: '{"device":{"network":{"ipv4":{"auto":null}}}}'
  params: []
- id: device_network_ipv4_ipaddr_query
  label: Current IPv4 Addresses (query)
  kind: query
  command: '{"device":{"network":{"ipv4":{"ipaddr":null}}}}'
  params: []
- id: device_network_ipv4_netmask_query
  label: Current IPv4 Netmasks (query)
  kind: query
  command: '{"device":{"network":{"ipv4":{"netmask":null}}}}'
  params: []
- id: device_network_ipv4_gateway_query
  label: Current IPv4 Gateways (query)
  kind: query
  command: '{"device":{"network":{"ipv4":{"gateway":null}}}}'
  params: []
- id: device_network_ipv4_fixed_ipaddr_set
  label: Set Stored IPv4 Address
  kind: action
  command: '{"device":{"network":{"ipv4":{"fixed_ipaddr":["<ip>"]}}}}'
  params:
    - name: ip
      type: string
      description: IPv4 address
- id: device_network_ipv4_fixed_netmask_set
  label: Set Stored IPv4 Netmask
  kind: action
  command: '{"device":{"network":{"ipv4":{"fixed_netmask":["<mask>"]}}}}'
  params:
    - name: mask
      type: string
      description: Netmask
- id: device_network_ipv4_fixed_gateway_set
  label: Set Stored IPv4 Gateway
  kind: action
  command: '{"device":{"network":{"ipv4":{"fixed_gateway":["<gw>"]}}}}'
  params:
    - name: gw
      type: string
      description: Gateway address
- id: device_network_ipv4_manual_ipaddr_set
  label: Set Manual IPv4 Address (MCR DW)
  kind: action
  command: '{"device":{"network":{"ipv4":{"manual_ipaddr":["<ip>"]}}}}'
  params:
    - name: ip
      type: string
      description: IPv4 address
- id: device_network_ipv4_manual_netmask_set
  label: Set Manual IPv4 Netmask (MCR DW)
  kind: action
  command: '{"device":{"network":{"ipv4":{"manual_netmask":["<mask>"]}}}}'
  params:
    - name: mask
      type: string
      description: Netmask
- id: device_network_ipv4_manual_gateway_set
  label: Set Manual IPv4 Gateway (MCR DW)
  kind: action
  command: '{"device":{"network":{"ipv4":{"manual_gateway":["<gw>"]}}}}'
  params:
    - name: gw
      type: string
      description: Gateway
- id: device_network_ipv6_interfaces_query
  label: IPv6 Interface Index (query)
  kind: query
  command: '{"device":{"network":{"ipv6":{"interfaces":null}}}}'
  params: []
- id: device_network_ipv6_ipaddr_query
  label: Current IPv6 Addresses (query)
  kind: query
  command: '{"device":{"network":{"ipv6":{"ipaddr":null}}}}'
  params: []
- id: device_network_mdns_set
  label: Set mDNS (MCR DW)
  kind: action
  command: '{"device":{"network":{"mdns":<bool>}}}'
  params:
    - name: bool
      type: boolean
      description: Enable/disable mDNS
- id: device_network_mdns_query
  label: mDNS State (query)
  kind: query
  command: '{"device":{"network":{"mdns":null}}}'
  params: []
- id: device_network_mdns_responder_set
  label: Set mDNS Responder (Rack/CHG)
  kind: action
  command: '{"device":{"network":{"mdns_responder":<bool>}}}'
  params:
    - name: bool
      type: boolean
      description: Enable/disable mDNS
- id: device_network_mdns_responder_query
  label: mDNS Responder State (query)
  kind: query
  command: '{"device":{"network":{"mdns_responder":null}}}'
  params: []
- id: device_state_query
  label: Device State (query)
  kind: query
  command: '{"device":{"state":null}}'
  params: []
- id: device_progress_query
  label: Update Progress (query)
  kind: query
  command: '{"device":{"progress":null}}'
  params: []
- id: device_update_confirmation
  label: Approve/Reject Update
  kind: action
  command: '{"device":{"update":{"confirmation":<bool>}}}'
  params:
    - name: bool
      type: boolean
      description: true=approve, false=reject
- id: device_update_enable
  label: Trigger Device Update (MCR DW)
  kind: action
  command: '{"device":{"update":{"enable":true}}}'
  params: []
- id: device_update_progress_query
  label: Update Progress (query, MCR DW)
  kind: query
  command: '{"device":{"update":{"progress":null}}}'
  params: []
- id: device_reset
  label: Soft Reset
  kind: action
  command: '{"device":{"reset":true}}'
  params: []
- id: device_factory_reset
  label: Factory Reset
  kind: action
  command: '{"device":{"factory_reset":true}}'
  params: []
- id: device_restart
  label: Restart Device (MCR DW)
  kind: action
  command: '{"device":{"restart":true}}'
  params: []
- id: device_standby_set
  label: Enter Standby (MCR DW)
  kind: action
  command: '{"device":{"standby":true}}'
  params: []
- id: device_standby_query
  label: Standby State (query)
  kind: query
  command: '{"device":{"standby":null}}'
  params: []
- id: device_restore_set
  label: Restore Defaults (MCR DW)
  kind: action
  command: '{"device":{"restore":"<FACTORY_DEFAULTS|AUDIO_DEFAULTS>"}}'
  params:
    - name: option
      type: string
      description: FACTORY_DEFAULTS or AUDIO_DEFAULTS
- id: device_date_query
  label: Device Date String (query)
  kind: query
  command: '{"device":{"date":null}}'
  params: []
- id: device_time_set
  label: Set Device Time (MCR DW)
  kind: action
  command: '{"device":{"time":<epoch_seconds>}}'
  params:
    - name: epoch_seconds
      type: integer
      description: Seconds since 2000-01-01 UTC
- id: device_time_query
  label: Device Time (query)
  kind: query
  command: '{"device":{"time":null}}'
  params: []
- id: device_timeprecision_query
  label: Time Precision (query)
  kind: query
  command: '{"device":{"timeprecision":null}}'
  params: []
- id: device_warnings_query
  label: Device Warnings (query)
  kind: query
  command: '{"device":{"warnings":null}}'
  params: []
- id: device_rfpi_query
  label: Device RFPI (query, MCR DW)
  kind: query
  command: '{"device":{"rfpi":null}}'
  params: []
- id: device_ptxversion_sl_query
  label: Stored pTX SL Firmware Version (query, CHG)
  kind: query
  command: '{"device":{"ptxversion_sl":null}}'
  params: []
- id: device_ptxversion_d1_query
  label: Stored pTX D1 Firmware Version (query, CHG)
  kind: query
  command: '{"device":{"ptxversion_d1":null}}'
  params: []

- id: rx1_identify_set
  label: Identify rx1 (Rack DW)
  kind: action
  command: '{"rx1":{"identify":<bool>}}'
  params:
    - name: bool
      type: boolean
      description: true=start identify, false=stop
- id: rx1_pair_set
  label: Pair Mode rx1 (Rack DW)
  kind: action
  command: '{"rx1":{"pair":<bool>}}'
  params:
    - name: bool
      type: boolean
      description: true=start pair, false=stop
- id: rx1_rf_quality_query
  label: rx1 RF Quality (query)
  kind: query
  command: '{"rx1":{"rf_quality":null}}'
  params: []
- id: rx1_walktest_set
  label: Walktest Mode rx1
  kind: action
  command: '{"rx1":{"walktest":<bool>}}'
  params:
    - name: bool
      type: boolean
      description: true=start, false=stop
- id: rx1_mute_switch_active_set
  label: Mute Switch Active rx1 (Rack DW)
  kind: action
  command: '{"rx1":{"mute_switch_active":<bool>}}'
  params:
    - name: bool
      type: boolean
      description: Enable/disable mute switch on transmitter
- id: rx1_sync_info_query
  label: rx1 Sync Info (query)
  kind: query
  command: '{"rx1":{"sync_info":null}}'
  params: []
- id: rx1_rfpi_query
  label: rx1 RFPI (query)
  kind: query
  command: '{"rx1":{"rfpi":null}}'
  params: []
- id: rx1_last_paired_ipei_query
  label: rx1 Last Paired IPEI (query)
  kind: query
  command: '{"rx1":{"last_paired_ipei":null}}'
  params: []
- id: rx1_autolock_query
  label: rx1 Autolock (query)
  kind: query
  command: '{"rx1":{"autolock":null}}'
  params: []
- id: rx1_warnings_query
  label: rx1 Warnings (query)
  kind: query
  command: '{"rx1":{"warnings":null}}'
  params: []
- id: rx1_mute_mode_set
  label: Set rx1 Mute Mode (Rack DW)
  kind: action
  command: '{"rx1":{"mute_mode":<0..4>}}'
  params:
    - name: index
      type: integer
      description: 0=Deactivated, 1=Active, 2=Push-to-Talk, 3=Push-to-Mute, 4=Location-Based Mute
- id: rx1_mute_state_set
  label: Set rx1 Mute State (Rack DW)
  kind: action
  command: '{"rx1":{"mute_state":<bool>}}'
  params:
    - name: bool
      type: boolean
      description: Mute state
- id: rx1_mute_state_query
  label: rx1 Mute State (query)
  kind: query
  command: '{"rx1":{"mute_state":null}}'
  params: []

- id: rxN_state_query
  label: Channel rxN State (query, MCR DW)
  kind: query
  command: '{"rx<N>":{"state":null}}'
  params:
    - name: channel
      type: integer
      description: Channel index 1-4 (2-ch: 1-2)
- id: rxN_identification_visual
  label: Trigger Channel Visual Identify (MCR DW)
  kind: action
  command: '{"rx<N>":{"identification":{"visual":true}}}'
  params:
    - name: channel
      type: integer
      description: Channel index 1-4
- id: rxN_update_confirmation
  label: Approve/Reject Channel Transmitter Update (MCR DW)
  kind: action
  command: '{"rx<N>":{"update":{"confirmation":<bool>}}}'
  params:
    - name: channel
      type: integer
      description: Channel index 1-4
    - name: bool
      type: boolean
      description: true=approve, false=reject (rejection removes transmitter from pairing list)
- id: rxN_update_progress_query
  label: Channel Update Progress (query, MCR DW)
  kind: query
  command: '{"rx<N>":{"update":{"progress":null}}}'
  params:
    - name: channel
      type: integer
      description: Channel index 1-4
- id: rxN_pair_enable_set
  label: Channel Pair Mode (MCR DW)
  kind: action
  command: '{"rx<N>":{"pair":{"enable":<bool>}}}'
  params:
    - name: channel
      type: integer
      description: Channel index 1-4
    - name: bool
      type: boolean
      description: true=start, false=stop
- id: rxN_pair_progress_query
  label: Channel Pair Countdown (query, MCR DW)
  kind: query
  command: '{"rx<N>":{"pair":{"progress":null}}}'
  params:
    - name: channel
      type: integer
      description: Channel index 1-4
- id: rxN_rf_quality_query
  label: Channel RF Quality (query, MCR DW)
  kind: query
  command: '{"rx<N>":{"rf_quality":null}}}'
  params:
    - name: channel
      type: integer
      description: Channel index 1-4
- id: rxN_walktest_set
  label: Channel Walktest (MCR DW)
  kind: action
  command: '{"rx<N>":{"walktest":<bool>}}'
  params:
    - name: channel
      type: integer
      description: Channel index 1-4
    - name: bool
      type: boolean
      description: true=start, false=stop
- id: rxN_mates_query
  label: Channel Active Mates (query, MCR DW)
  kind: query
  command: '{"rx<N>":{"mates":null}}'
  params:
    - name: channel
      type: integer
      description: Channel index 1-4
- id: rxN_mute_mode_set
  label: Set Channel Mute Mode (MCR DW)
  kind: action
  command: '{"rx<N>":{"mute_mode":"<OFF|ON|PUSH_TO_TALK|PUSH_TO_MUTE|ROOM_MUTE>"}}'
  params:
    - name: channel
      type: integer
      description: Channel index 1-4
    - name: mode
      type: string
      description: OFF, ON, PUSH_TO_TALK, PUSH_TO_MUTE, ROOM_MUTE
- id: rxN_mute_mode_query
  label: Channel Mute Mode (query, MCR DW)
  kind: query
  command: '{"rx<N>":{"mute_mode":null}}'
  params:
    - name: channel
      type: integer
      description: Channel index 1-4
- id: rxN_mute_state_set
  label: Set Channel Mute State (MCR DW)
  kind: action
  command: '{"rx<N>":{"mute_state":<bool>}}'
  params:
    - name: channel
      type: integer
      description: Channel index 1-4
    - name: bool
      type: boolean
      description: Mute state
- id: rxN_mute_state_query
  label: Channel Mute State (query, MCR DW)
  kind: query
  command: '{"rx<N>":{"mute_state":null}}'
  params:
    - name: channel
      type: integer
      description: Channel index 1-4
- id: rxN_name_set
  label: Set Channel Name (MCR DW)
  kind: action
  command: '{"rx<N>":{"name":"<name>"}}'
  params:
    - name: channel
      type: integer
      description: Channel index 1-4
    - name: name
      type: string
      description: 1-8 chars reduced charset
- id: rxN_master_follower_sync_info_query
  label: Channel Master/Follower Sync Info (query, MCR DW)
  kind: query
  command: '{"rx<N>":{"master_follower":{"sync_info":null}}}'
  params:
    - name: channel
      type: integer
      description: Channel index 1-4
- id: rxN_rfpi_query
  label: Channel RFPI (query, MCR DW)
  kind: query
  command: '{"rx<N>":{"rfpi":null}}'
  params:
    - name: channel
      type: integer
      description: Channel index 1-4
- id: rxN_last_paired_ipei_query
  label: Channel Last Paired IPEI (query, MCR DW)
  kind: query
  command: '{"rx<N>":{"last_paired_ipei":null}}'
  params:
    - name: channel
      type: integer
      description: Channel index 1-4
- id: rxN_warnings_query
  label: Channel Warnings (query, MCR DW)
  kind: query
  command: '{"rx<N>":{"warnings":null}}'
  params:
    - name: channel
      type: integer
      description: Channel index 1-4

- id: mates_active_query
  label: Active Mates (query)
  kind: query
  command: '{"mates":{"active":null}}'
  params: []
- id: mates_tx1_device_type_query
  label: Transmitter Type (query)
  kind: query
  command: '{"mates":{"tx1":{"device_type":null}}}'
  params: []
- id: mates_tx1_bat_type_query
  label: Battery Type (query)
  kind: query
  command: '{"mates":{"tx1":{"bat_type":null}}}'
  params: []
- id: mates_tx1_bat_state_query
  label: Battery State (query)
  kind: query
  command: '{"mates":{"tx1":{"bat_state":null}}}'
  params: []
- id: mates_tx1_bat_charging_query
  label: Battery Charging (query)
  kind: query
  command: '{"mates":{"tx1":{"bat_charging":null}}}'
  params: []
- id: mates_tx1_bat_gauge_query
  label: Battery Gauge (query)
  kind: query
  command: '{"mates":{"tx1":{"bat_gauge":null}}}'
  params: []
- id: mates_tx1_bat_lifetime_query
  label: Battery Lifetime Seconds (query)
  kind: query
  command: '{"mates":{"tx1":{"bat_lifetime":null}}}'
  params: []
- id: mates_tx1_bat_bars_query
  label: Battery Bars (query)
  kind: query
  command: '{"mates":{"tx1":{"bat_bars":null}}}'
  params: []
- id: mates_tx1_bat_health_query
  label: Battery Health (query)
  kind: query
  command: '{"mates":{"tx1":{"bat_health":null}}}'
  params: []
- id: mates_tx1_bat_cycles_query
  label: Battery Charge Cycles (query)
  kind: query
  command: '{"mates":{"tx1":{"bat_cycles":null}}}'
  params: []
- id: mates_tx1_switch1_label_query
  label: Switch1 Label (query)
  kind: query
  command: '{"mates":{"tx1":{"switch1":{"label":null}}}}'
  params: []
- id: mates_tx1_switch1_state_query
  label: Switch1 State (query)
  kind: query
  command: '{"mates":{"tx1":{"switch1":{"state":null}}}}'
  params: []
- id: mates_tx1_acoustic_query
  label: Acoustic Capsule Type (query)
  kind: query
  command: '{"mates":{"tx1":{"acoustic":null}}}'
  params: []
- id: mates_tx1_warnings_query
  label: Transmitter Warnings (query)
  kind: query
  command: '{"mates":{"tx1":{"warnings":null}}}'
  params: []
- id: mates_tx1_gooseneck_state_query
  label: Gooseneck Attached (query, Tablestand)
  kind: query
  command: '{"mates":{"tx1":{"gooseneck_state":null}}}'
  params: []
- id: mates_tx1_agc_set
  label: Set TX Audio Sensitivity
  kind: action
  command: '{"mates":{"tx1":{"agc":<index>}}}'
  params:
    - name: index
      type: integer
      description: Rack DW: 0=Auto, 1=0dB, 2=-6dB, 3=-12dB, 4=-18dB, 5=-24dB, 6=-30dB
- id: mates_tx1_agc_query
  label: TX Audio Sensitivity (query)
  kind: query
  command: '{"mates":{"tx1":{"agc":null}}}'
  params: []
- id: mates_tx1_power_lock_set
  label: Disable Transmitter Power Button
  kind: action
  command: '{"mates":{"tx1":{"power_lock":<bool>}}}'
  params:
    - name: bool
      type: boolean
      description: true=disable button
- id: mates_tx1_power_down
  label: Remote Power Down Transmitter
  kind: action
  command: '{"mates":{"tx1":{"power_down":true}}}'
  params: []
- id: mates_tx1_pairing_lock_set
  label: Disable Transmitter Pairing Button
  kind: action
  command: '{"mates":{"tx1":{"pairing_lock":<bool>}}}'
  params:
    - name: bool
      type: boolean
      description: true=disable
- id: mates_tx1_pairing_button_lock_set
  label: Disable Pairing Button (MCR DW)
  kind: action
  command: '{"mates":{"tx1":{"pairing_button_lock":<bool>}}}'
  params:
    - name: bool
      type: boolean
      description: true=disable
- id: mates_tx1_auto_power_off_set
  label: Set TX Auto Power-Off
  kind: action
  command: '{"mates":{"tx1":{"auto_power_off":"<option>"}}}'
  params:
    - name: option
      type: string
      description: Rack DW: "0","1","2","3" (Off/10/20/30min); MCR DW: "OFF","10MIN","20MIN","30MIN"
- id: mates_tx1_auto_power_off_query
  label: TX Auto Power-Off (query)
  kind: query
  command: '{"mates":{"tx1":{"auto_power_off":null}}}'
  params: []
- id: mates_tx1_led_active_set
  label: Set Transmitter LED Active
  kind: action
  command: '{"mates":{"tx1":{"led_active":<bool>}}}'
  params:
    - name: bool
      type: boolean
      description: Enable/disable LED
- id: mates_tx1_led_active_query
  label: Transmitter LED Active (query)
  kind: query
  command: '{"mates":{"tx1":{"led_active":null}}}'
  params: []
- id: mates_tx1_active_query
  label: tx1 Active Link (query, MCR DW)
  kind: query
  command: '{"mates":{"tx1":{"active":null}}}'
  params: []

- id: audio_out1_label_query
  label: Audio out1 Label (query)
  kind: query
  command: '{"audio":{"out1":{"label":null}}}'
  params: []
- id: audio_out1_desc_query
  label: Audio out1 Description (query, MCR DW)
  kind: query
  command: '{"audio":{"out1":{"desc":null}}}'
  params: []
- id: audio_out1_level_db_query
  label: Audio out1 Level dB (query, Rack DW)
  kind: query
  command: '{"audio":{"out1":{"level_db":null}}}'
  params: []
- id: audio_out1_gain_db_set
  label: Set Audio out1 Gain (Rack DW)
  kind: action
  command: '{"audio":{"out1":{"gain_db":<0..6>}}}'
  params:
    - name: index
      type: integer
      description: 0=-24dB, 1=-18dB, 2=-12dB, 3=-6dB, 4=0dB, 5=6dB, 6=12dB
- id: audio_out1_gain_db_query
  label: Audio out1 Gain (query)
  kind: query
  command: '{"audio":{"out1":{"gain_db":null}}}'
  params: []
- id: audio_out1_mixer_gain_query
  label: Audio out1 Mixer Gain (query, MCR DW)
  kind: query
  command: '{"audio":{"out1":{"mixer":{"gain":null}}}}'
  params: []
- id: audio_equalizer_preset_set
  label: Set EQ Preset (Rack DW)
  kind: action
  command: '{"audio":{"equalizer":{"preset":<0..4>}}}'
  params:
    - name: index
      type: integer
      description: 0=Off, 1=Female Speech, 2=Male Speech, 3=Media, 4=Custom
- id: audio_equalizer_preset_query
  label: EQ Preset (query)
  kind: query
  command: '{"audio":{"equalizer":{"preset":null}}}'
  params: []
- id: audio_low_cut_set
  label: Set Low Cut (Rack DW)
  kind: action
  command: '{"audio":{"low_cut":<bool>}}'
  params:
    - name: bool
      type: boolean
      description: Enable/disable low cut
- id: audio_low_cut_query
  label: Low Cut (query)
  kind: query
  command: '{"audio":{"low_cut":null}}'
  params: []
- id: audio_effects_reset
  label: Reset Audio Effects (Rack DW)
  kind: action
  command: '{"audio":{"effects_reset":true}}'
  params: []
- id: brightness_set
  label: Set OLED Brightness (Rack DW)
  kind: action
  command: '{"brightness":<0..100>}'
  params:
    - name: percent
      type: integer
      description: 0-100 percent
- id: brightness_query
  label: OLED Brightness (query)
  kind: query
  command: '{"brightness":null}'
  params: []

- id: audio_out2_identity_version_query
  label: Dante Interface Version (query, MCR DW)
  kind: query
  command: '{"audio":{"out2":{"identity":{"version":null}}}}'
  params: []
- id: audio_out2_network_ether_interfaces_query
  label: Dante Ethernet Interfaces (query, MCR DW)
  kind: query
  command: '{"audio":{"out2":{"network":{"ether":{"interfaces":null}}}}'
  params: []
- id: audio_out2_network_ipv4_interfaces_query
  label: Dante IPv4 Interfaces (query, MCR DW)
  kind: query
  command: '{"audio":{"out2":{"network":{"ipv4":{"interfaces":null}}}}'
  params: []
- id: audio_out2_network_ether_macs_query
  label: Dante MAC Addresses (query, MCR DW)
  kind: query
  command: '{"audio":{"out2":{"network":{"ether":{"macs":null}}}}'
  params: []
- id: audio_out2_network_ipv4_auto_set
  label: Set Dante IPv4 Auto (MCR DW)
  kind: action
  command: '{"audio":{"out2":{"network":{"ipv4":{"auto":[<bool>,<bool>]}}}}'
  params:
    - name: primary
      type: boolean
      description: Primary Dante interface DHCP/Auto
    - name: secondary
      type: boolean
      description: Secondary Dante interface DHCP/Auto (or null)
- id: audio_out2_network_ipv4_auto_query
  label: Dante IPv4 Auto (query, MCR DW)
  kind: query
  command: '{"audio":{"out2":{"network":{"ipv4":{"auto":null}}}}'
  params: []
- id: audio_out2_network_ipv4_ipaddr_query
  label: Dante IPv4 Addresses (query, MCR DW)
  kind: query
  command: '{"audio":{"out2":{"network":{"ipv4":{"ipaddr":null}}}}'
  params: []
- id: audio_out2_network_ipv4_netmask_query
  label: Dante IPv4 Netmasks (query, MCR DW)
  kind: query
  command: '{"audio":{"out2":{"network":{"ipv4":{"netmask":null}}}}'
  params: []
- id: audio_out2_network_ipv4_gateway_query
  label: Dante IPv4 Gateways (query, MCR DW)
  kind: query
  command: '{"audio":{"out2":{"network":{"ipv4":{"gateway":null}}}}'
  params: []
- id: audio_out2_network_ipv4_manual_ipaddr_set
  label: Set Dante Manual IPv4 (MCR DW)
  kind: action
  command: '{"audio":{"out2":{"network":{"ipv4":{"manual_ipaddr":["<ip1>","<ip2>"]}}}}'
  params:
    - name: ip1
      type: string
      description: Primary IPv4
    - name: ip2
      type: string
      description: Secondary IPv4 (or null)
- id: audio_out2_network_ipv4_manual_netmask_set
  label: Set Dante Manual Netmask (MCR DW)
  kind: action
  command: '{"audio":{"out2":{"network":{"ipv4":{"manual_netmask":["<m1>","<m2>"]}}}}'
  params:
    - name: m1
      type: string
      description: Primary netmask
    - name: m2
      type: string
      description: Secondary netmask (or null)
- id: audio_out2_network_ipv4_manual_gateway_set
  label: Set Dante Manual Gateway (MCR DW)
  kind: action
  command: '{"audio":{"out2":{"network":{"ipv4":{"manual_gateway":["<gw1>","<gw2>"]}}}}'
  params:
    - name: gw1
      type: string
      description: Primary gateway
    - name: gw2
      type: string
      description: Secondary gateway (or null)
- id: audio_dante_mixer_gain_set
  label: Set Dante Mixer Gain (MCR DW)
  kind: action
  command: '{"audio":{"dante":{"mixer":{"gain":<value>}}}'
  params:
    - name: value
      type: integer
      description: -24..12 dB, increments of 6
- id: audio_dante_mixer_gain_query
  label: Dante Mixer Gain (query, MCR DW)
  kind: query
  command: '{"audio":{"dante":{"mixer":{"gain":null}}}'
  params: []
- id: audio_rxN_gain_set
  label: Set Channel Gain (MCR DW)
  kind: action
  command: '{"audio":{"rx<N>":{"gain":<value>}}}'
  params:
    - name: channel
      type: integer
      description: Channel index 1-4
    - name: value
      type: integer
      description: -24..12 dB, increments of 6
- id: audio_rxN_gain_query
  label: Channel Gain (query, MCR DW)
  kind: query
  command: '{"audio":{"rx<N>":{"gain":null}}}'
  params:
    - name: channel
      type: integer
      description: Channel index 1-4
- id: audio_rxN_equalizer_preset_set
  label: Set Channel EQ Preset (MCR DW)
  kind: action
  command: '{"audio":{"rx<N>":{"equalizer":{"preset":"<option>"}}}'
  params:
    - name: channel
      type: integer
      description: Channel index 1-4
    - name: option
      type: string
      description: OFF, FEMALE_SPEECH, MALE_SPEECH, MEDIA, CUSTOM
- id: audio_rxN_equalizer_preset_query
  label: Channel EQ Preset (query, MCR DW)
  kind: query
  command: '{"audio":{"rx<N>":{"equalizer":{"preset":null}}}'
  params:
    - name: channel
      type: integer
      description: Channel index 1-4
- id: audio_rxN_low_cut_set
  label: Set Channel Low Cut (MCR DW)
  kind: action
  command: '{"audio":{"rx<N>":{"low_cut":<bool>}}'
  params:
    - name: channel
      type: integer
      description: Channel index 1-4
    - name: bool
      type: boolean
      description: Enable/disable
- id: audio_rxN_restore
  label: Restore Channel Audio Defaults (MCR DW)
  kind: action
  command: '{"audio":{"rx<N>":{"restore":true}}'
  params:
    - name: channel
      type: integer
      description: Channel index 1-4
- id: m_mixer_level_query
  label: Mixed Audio Level (query, MCR DW)
  kind: query
  command: '{"m":{"mixer":{"level":null}}}'
  params: []
- id: m_rxN_level_query
  label: Channel Incoming Audio Level (query, MCR DW)
  kind: query
  command: '{"m":{"rx<N>":{"level":null}}}'
  params:
    - name: channel
      type: integer
      description: Channel index 1-4
- id: m_rxN_channel_level_query
  label: Channel Post-Gain Audio Level (query, MCR DW)
  kind: query
  command: '{"m":{"rx<N>":{"channel_level":null}}}'
  params:
    - name: channel
      type: integer
      description: Channel index 1-4

- id: bays_active_query
  label: Active Bays (query, CHG)
  kind: query
  command: '{"bays":{"active":null}}'
  params: []
- id: bays_device_type_query
  label: Bay Device Types (query, CHG)
  kind: query
  command: '{"bays":{"device_type":null}}'
  params: []
- id: bays_serial_query
  label: Bay Serial Numbers (query, CHG)
  kind: query
  command: '{"bays":{"serial":null}}'
  params: []
- id: bays_version_query
  label: Bay Firmware Versions (query, CHG)
  kind: query
  command: '{"bays":{"version":null}}'
  params: []
- id: bays_linkdate_query
  label: Bay Firmware Linkdates (query, CHG)
  kind: query
  command: '{"bays":{"linkdate":null}}'
  params: []
- id: bays_charging_query
  label: Bay Charging Status (query, CHG)
  kind: query
  command: '{"bays":{"charging":null}}'
  params: []
- id: bays_bat_gauge_query
  label: Bay Battery Gauge (query, CHG)
  kind: query
  command: '{"bays":{"bat_gauge":null}}'
  params: []
- id: bays_bat_timetofull_query
  label: Bay Time to Full (query, CHG)
  kind: query
  command: '{"bays":{"bat_timetofull":null}}'
  params: []
- id: bays_bat_bars_query
  label: Bay Battery Bars (query, CHG)
  kind: query
  command: '{"bays":{"bat_bars":null}}'
  params: []
- id: bays_bat_health_query
  label: Bay Battery Health (query, CHG)
  kind: query
  command: '{"bays":{"bat_health":null}}'
  params: []
- id: bays_bat_cycles_query
  label: Bay Charge Cycles (query, CHG)
  kind: query
  command: '{"bays":{"bat_cycles":null}}'
  params: []
- id: bays_identify_set
  label: Identify CHG Bays
  kind: action
  command: '{"bays":{"identify":[<b1>,<b2>,<b3>,<b4>]}}'
  params:
    - name: b1
      type: boolean
      description: Bay 1 LED flash (true=on, null=unchanged)
    - name: b2
      type: boolean
      description: Bay 2 (CHG 2N/4N)
    - name: b3
      type: boolean
      description: Bay 3 (CHG 4N only)
    - name: b4
      type: boolean
      description: Bay 4 (CHG 4N only)
- id: bays_state_query
  label: Bay State and Error Bitmap (query, CHG)
  kind: query
  command: '{"bays":{"state":null}}'
  params: []
- id: device_network_ipv4_interfaces_query
  label: IPv4 Interfaces (query)
  kind: query
  command: '{"device":{"network":{"ipv4":{"interfaces":null}}}}'
  params: []
- id: device_dante_name_query
  label: Dante Name (query, MCR DW)
  kind: query
  command: '{"device":{"dante":{"name":null}}}'
  params: []
- id: rx_n_name_query
  label: Channel Name (query, MCR DW)
  kind: query
  command: '{"rx1":{"name":null}}'
  params:
    - name: channel
      type: integer
      description: 'Replace rx1 by the desired channel name: rx1 or rx2 for channel 1 or 2 of the 2-channel variant SL MCR 2 DW; rx1, rx2, rx3 or rx4 for channel 1, 2, 3 or 4 of the 4-channel variant SL MCR 4 DW.'
- id: mates_tx1_power_lock_query
  label: Transmitter Power Button Lock (query)
  kind: query
  command: '{"mates":{"tx1":{"power_lock":null}}}'
  params: []
- id: mates_tx1_pairing_lock_query
  label: Transmitter Pairing Button Lock (query, Rack DW)
  kind: query
  command: '{"mates":{"tx1":{"pairing_lock":null}}}'
  params: []
- id: mates_tx1_pairing_button_lock_query
  label: Transmitter Pairing Button Lock (query, MCR DW)
  kind: query
  command: '{"mates":{"tx1":{"pairing_button_lock":null}}}'
  params: []
- id: mates_tx1_power_down_query
  label: Transmitter Power Down (query, MCR DW)
  kind: query
  command: '{"mates":{"tx1":{"power_down":null}}}'
  params: []
- id: audio_rx_n_low_cut_query
  label: Channel Low Cut (query, MCR DW)
  kind: query
  command: '{"audio":{"rx1":{"low_cut":null}}}'
  params:
    - name: channel
      type: integer
      description: 'Replace rx1 by the desired channel name: rx1 or rx2 for channel 1 or 2 of the 2-channel variant SL MCR 2 DW; rx1, rx2, rx3 or rx4 for channel 1, 2, 3 or 4 of the 4-channel variant SL MCR 4 DW.'
```

## Feedbacks
```yaml
- id: osc_error
  type: object
  description: Error reply structure emitted by server on malformed/forbidden requests. Wraps a three-digit numeric error code and optional desc/reason fields. Standard codes: 100,102,200,201,202,210,310,400,401,403,404,406,408,409,410,413,414,422,423,424,450,454,500,501,503.

- id: subscription_notification
  type: object
  description: Unsolicited notification containing the current value of any subscribed address when it changes. Format mirrors the corresponding query reply.

- id: subscription_terminated
  type: object
  description: Sent by server on subscription lifetime/count expiry with error 310.

- id: osc_xid_echo
  type: object
  description: Server reflects /osc/xid arguments back in reply, allowing clients to correlate request/response.
```

## Variables
```yaml
- id: audio_out1_mixer_gain
  type: number
  description: out1 analog mixer gain in dB (MCR DW). Range -24..12 dB, step 6. Read-only via this address; write through /audio/out1/mixer/gain if exposed (source documents query path).
- id: audio_dante_mixer_gain
  type: number
  description: Dante (out2) mixer gain in dB (MCR DW). Range -24..12 dB, step 6.
- id: audio_rxN_gain
  type: number
  description: Per-channel audio gain (MCR DW). Range -24..12 dB, step 6.
- id: brightness
  type: integer
  description: OLED display brightness percentage (Rack DW). Range 0..100.
- id: led_brightness
  type: integer
  description: LED brightness level (MCR DW). Range 0..5.
```

## Events
```yaml
- id: subscription_change_notification
  description: Emitted whenever a subscribed SSC method address value changes. Payload is identical to the corresponding query reply. Termination via error 310 after lifetime expiry or notification count reached.
```

## Macros
```yaml
# UNRESOLVED: source does not describe named multi-step macros
```

## Safety
```yaml
confirmation_required_for:
  - /device/factory_reset
  - /device/restore with FACTORY_DEFAULTS
  - /device/update/enable (MCR DW)
  - /rx*/update/confirmation=false (MCR DW; rejection removes transmitter from pairing list)
  - /bays/identify (LED state held 10s)
interlocks:
  - SL MCR DW transmitter update must be in UPDATE state for /device/update/progress and /rx*/update/progress queries.
  - Channel must be in PAIRING state for /rx*/pair/progress query (MCR DW).
  - Channel must be in FWU_OTA_CONFIRMATION state for /rx*/update/confirmation (MCR DW).
  - Network setting changes may require device restart (e.g. /device/network/ipv4/auto on Rack/CHG, /device/network/interface_mapping on MCR DW).
  - /device/network/mdns_responder on Rack/CHG takes effect after restart.
  - Audio auto settings on /audio/out2/network/ipv4/auto (Dante) trigger automatic restart on write.
# UNRESOLVED: source does not document electrical/firmware-safety interlocks, voltage/current specs, or operator-visible hazard warnings.
```

## Notes
SSC is a JSON-over-UDP protocol modeled on OSC address paths. One UDP datagram carries one SSC message. The protocol explicitly references OSC features (`/osc/xid`, `/osc/state/subscribe`, `/osc/error`, `/osc/limits`, `/osc/schema`) inherited from OSC. Devices subscribe to address changes; default subscription lifetime is 10s with max 1000 notifications; clients may specify `lifetime` (seconds), `count`, or `cancel:true`. Up to 8 simultaneous subscriber clients per device.

Channel enumeration: SL MCR 2 DW exposes `rx1`..`rx2`; SL MCR 4 DW exposes `rx1`..`rx4`. The MCR DW methods containing `rx1` or `tx1` are documented as applying to any channel by substitution. The SL Rack Receiver DW has a single `rx1`.

Mute-mode option sets differ by device: Rack DW uses numeric indices 0..4, MCR DW uses string options `OFF|ON|PUSH_TO_TALK|PUSH_TO_MUTE|ROOM_MUTE`. Auto-power-off encoding differs similarly (Rack DW: numeric `"0".."3"`; MCR DW: `"OFF"|"10MIN"|"20MIN"|"30MIN"`). EQ preset encoding also differs (Rack DW: numeric; MCR DW: string `OFF|FEMALE_SPEECH|MALE_SPEECH|MEDIA|CUSTOM`).

Source document enumerates complete error code list (1xx, 2xx, 3xx, 4xx, 5xx) following HTTP-style status codes; included in `Feedbacks` block. No authentication, login, or token mechanism documented.

<!-- UNRESOLVED: device firmware version compatibility across the three device groups not stated. Voltage/current/power specifications not stated. Authentication credentials or token formats: none documented. -->

## Provenance

```yaml
source_domains:
  - assets.sennheiser.com
source_urls:
  - https://assets.sennheiser.com/download/assets/TI_1094_v4.3_Sennheiser_Sound_Control_Protocol_SL_DW_EN.pdf/b2a3c92ce7bb11f088db768ee8e97aea
retrieved_at: 2026-09-02T16:50:03.491Z
last_checked_at: 2026-10-07T22:08:20.812Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T22:08:20.812Z
matched_actions: 189
action_count: 189
confidence: medium
summary: "All 189 action units match source SSC methods across Rack, MCR and CHG sections, and port 45, UDP and DNS-SD are stated; no omitted methods found. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device-specific differences (e.g. rx1..rx4 channel enumeration on 4-channel variant, mute_mode enum variants) are described in prose but not enumerated here."
- "source does not describe named multi-step macros"
- "source does not document electrical/firmware-safety interlocks, voltage/current specs, or operator-visible hazard warnings."
- "device firmware version compatibility across the three device groups not stated. Voltage/current/power specifications not stated. Authentication credentials or token formats: none documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
