---
spec_id: admin/sennheiser-teamconnect-ceiling2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sennheiser TeamConnect Ceiling 2 Control Spec"
manufacturer: Sennheiser
model_family: "TeamConnect Ceiling 2"
aliases: []
compatible_with:
  manufacturers:
    - Sennheiser
    - "Sennheiser electronic GmbH & Co. KG"
  models:
    - "TeamConnect Ceiling 2"
  firmware: 1.8.0
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.sennheiser.com
  - docs.cloud.sennheiser.com
  - github.com
source_urls:
  - https://assets.sennheiser.com/download/assets/TI_1245_v1.8.0_Sennheiser_Sound_Control_Protocol_TCC2_EN.pdf/c204169ce7bb11f0a354ea55b5d2fb86
  - "https://assets.sennheiser.com/download/assets/EW-DX_Sound_Control_Protocol_03_2023_EN.pdf/69f9d4bee7b611f0ae307aeaa9c3764a?attachment=true"
  - https://docs.cloud.sennheiser.com/en-us/api-docs/api-docs/sound-control-protocol.html
  - https://docs.cloud.sennheiser.com/en-us/api-docs/index.html
  - https://github.com/chetan-prime/sennheiser-tcc-m-api
retrieved_at: 2026-06-18T01:55:07.954Z
last_checked_at: 2026-06-18T08:02:17.367Z
generated_at: 2026-06-18T08:02:17.367Z
firmware_coverage: 1.8.0
protocol_coverage: []
known_gaps:
  - "The source is the generic SSC protocol spec + TCC2 method list. It explicitly states UDP/IP as the mandatory transport (default port 45) and describes TCP/IP and HTTP/TCP as OPTIONAL transports in the generic SSC spec, but does not explicitly state which optional transports the TCC2 firmware actually implements."
  - "TCC2 exposes /osc/state/auth/access, hinting at an access-control mechanism, but no credentials, token format, or login procedure is documented for TCC2."
  - "Power supply / voltage / current ratings not in this document."
  - "source exposes /osc/state/auth/access (§7.88) but does not document a TCC2 login/credential procedure"
  - "source does not enumerate error result strings"
  - "element shape not further described"
  - "source does not document any device-emitted events independent of the subscription mechanism"
  - "source documents multi-method SSC transactions (multiple keys in"
  - "source contains no formal safety interlock procedures or"
  - "voltage / current / power specs not in this document"
  - "TCP and HTTP transport support not explicitly confirmed for TCC2 firmware"
  - "authentication procedure (TANs / access policy) documented generically in §5.1.14 and hinted by /osc/state/auth/access but no TCC2-specific credentials or login flow given"
  - "minimum value of /audio/out2/gain not stated (only default 12 and max 24)"
  - "exact contents of /device/update/error result strings not enumerated"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:02:17.367Z
  matched_actions: 129
  action_count: 129
  confidence: medium
  summary: "All 129 spec actions have verbatim command-payload matches in source 7.1-7.101; transport port 45 and DNS-SD _ssc._udp confirmed. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-18
---

# Sennheiser TeamConnect Ceiling 2 Control Spec

## Summary
The Sennheiser TeamConnect Ceiling 2 (TCC2, internal designation SLCM2) is a ceiling-array microphone for conference rooms. It is controlled via Sennheiser Sound Control (SSC), a JSON-encoded adaptation of Open Sound Control (OSC) intended for command-and-control (not audio streaming). Firmware version documented is 1.8.0.

<!-- UNRESOLVED: The source is the generic SSC protocol spec + TCC2 method list. It explicitly states UDP/IP as the mandatory transport (default port 45) and describes TCP/IP and HTTP/TCP as OPTIONAL transports in the generic SSC spec, but does not explicitly state which optional transports the TCC2 firmware actually implements. -->
<!-- UNRESOLVED: TCC2 exposes /osc/state/auth/access, hinting at an access-control mechanism, but no credentials, token format, or login procedure is documented for TCC2. -->
<!-- UNRESOLVED: Power supply / voltage / current ratings not in this document. -->

## Transport
```yaml
# UDP/IP is the MANDATORY SSC transport for all Ethernet-attached SSC servers
# (source §6.1). The default UDP port is 45 (source §6.1, §6.5).
# TCP/IP (§6.2) and HTTP/TCP (§6.3) are OPTIONAL in the SSC spec; TCC2
# firmware support for them is not explicitly confirmed in the source.
protocols:
  - udp
addressing:
  port: 45  # default UDP port per source §6.1 ("Sennheiser was founded in 1945")
auth:
  type: null  # UNRESOLVED: source exposes /osc/state/auth/access (§7.88) but does not document a TCC2 login/credential procedure
discovery:
  # Source §6.5: DNS-SD (Bonjour) service type "_ssc"; "_ssc._udp" mandatory,
  # "_ssc._tcp" published by servers that additionally support TCP.
  type: dns_sd
  service_type: _ssc._udp
```

## Traits
```yaml
- queryable  # inferred: many methods documented with null-argument query examples
- levelable  # inferred: gain/attenuation/brightness/threshold numeric setters documented
```

## Actions
```yaml
# SSC commands are JSON objects. Each action's `command:` field shows the JSON
# payload verbatim from the source. For setters the variable part is shown as
# `<name>` placeholder, documented in `params`. For queries the literal
# null-argument form is shown.
#
# Every method in source §7 (7.1 - 7.101) is enumerated below, including the
# deprecated /audio/exclusion_zone/* variants, because the source lists each
# as a separate row.

# --- Metering (read-only queries) ---
- id: m_beam_elevation_query
  label: Beam Elevation Meter
  kind: query
  command: '{"m":{"beam":{"elevation":null}}}'
  params: []
- id: m_beam_azimuth_query
  label: Beam Azimuth Meter
  kind: query
  command: '{"m":{"beam":{"azimuth":null}}}'
  params: []
- id: m_in1_peak_query
  label: Input 1 Peak Level Meter
  kind: query
  command: '{"m":{"in1":{"peak":null}}}'
  params: []
- id: m_ref1_rms_query
  label: AEC Reference 1 RMS Meter (dBfs)
  kind: query
  command: '{"m":{"ref1":{"rms":null}}}'
  params: []

# --- Device identification / status ---
- id: device_identification_visual_set
  label: Visual Identification (LED blink 10s)
  kind: action
  command: '{"device":{"identification":{"visual":<state>}}}'
  params:
    - name: state
      type: boolean
      description: true blinks LEDs for 10 seconds; resets to false after timeout
- id: device_button_state_query
  label: Reset Button State
  kind: query
  command: '{"device":{"button":{"state":null}}}'
  params: []
- id: device_button_label_query
  label: Reset Button Label
  kind: query
  command: '{"device":{"button":{"label":null}}}'
  params: []
- id: device_button_description_query
  label: Reset Button Container Description
  kind: query
  command: '{"device":{"button":{"description":null}}}'
  params: []
- id: device_identity_version_query
  label: Firmware Version
  kind: query
  command: '{"device":{"identity":{"version":null}}}'
  params: []
- id: device_identity_vendor_query
  label: Vendor Name
  kind: query
  command: '{"device":{"identity":{"vendor":null}}}'
  params: []
- id: device_identity_serial_query
  label: Device Serial Number
  kind: query
  command: '{"device":{"identity":{"serial":null}}}'
  params: []
- id: device_identity_product_query
  label: Product Identity
  kind: query
  command: '{"device":{"identity":{"product":null}}}'
  params: []
- id: device_identity_hw_revision_query
  label: Hardware Revision
  kind: query
  command: '{"device":{"identity":{"hw_revision":null}}}'
  params: []

# --- Firmware update ---
- id: device_update_progress_query
  label: Firmware Update Progress
  kind: query
  command: '{"device":{"update":{"progress":null}}}'
  params: []
- id: device_update_error_query
  label: Firmware Update Error Result
  kind: query
  command: '{"device":{"update":{"error":null}}}'
  params: []
- id: device_update_enable_set
  label: Start Firmware Update
  kind: action
  command: '{"device":{"update":{"enable":<state>}}}'
  params:
    - name: state
      type: boolean
      description: true starts firmware update; client cannot abort; device resets to false on completion

# --- LED ---
- id: device_led_custom_color_set
  label: Custom LED Color
  kind: action
  command: '{"device":{"led":{"custom":{"color":<color>}}}}'
  params:
    - name: color
      type: string
      description: One of LIGHT GREEN, GREEN, BLUE, RED, YELLOW, ORANGE, CYAN, PINK (default BLUE)
- id: device_led_custom_active_set
  label: Custom LED Active
  kind: action
  command: '{"device":{"led":{"custom":{"active":<state>}}}}'
  params:
    - name: state
      type: boolean
      description: Activates custom LED color (resets to false after reboot)
- id: device_led_mic_mute_color_set
  label: Mic Mute LED Color
  kind: action
  command: '{"device":{"led":{"mic_mute":{"color":<color>}}}}'
  params:
    - name: color
      type: string
      description: One of LIGHT GREEN, GREEN, BLUE, RED, YELLOW, ORANGE, CYAN, PINK (default RED)
- id: device_led_mic_on_color_set
  label: Mic On LED Color
  kind: action
  command: '{"device":{"led":{"mic_on":{"color":<color>}}}}'
  params:
    - name: color
      type: string
      description: One of LIGHT GREEN, GREEN, BLUE, RED, YELLOW, ORANGE, CYAN, PINK (default GREEN)
- id: device_led_show_farend_activity_set
  label: Far-End Activity LED Mode
  kind: action
  command: '{"device":{"led":{"show_farend_activity":<state>}}}'
  params:
    - name: state
      type: boolean
- id: device_led_brightness_set
  label: LED Brightness
  kind: action
  command: '{"device":{"led":{"brightness":<level>}}}'
  params:
    - name: level
      type: integer
      description: 0..5, 0 turns LEDs off (default 5)

# --- Network: control interface (IPv4) ---
- id: device_network_ether_macs_query
  label: Ethernet MAC Addresses
  kind: query
  command: '{"device":{"network":{"ether":{"macs":null}}}}'
  params: []
- id: device_network_ether_interfaces_query
  label: Ethernet Interface Names
  kind: query
  command: '{"device":{"network":{"ether":{"interfaces":null}}}}'
  params: []
- id: device_network_ipv4_netmask_query
  label: Current IPv4 Netmask(s)
  kind: query
  command: '{"device":{"network":{"ipv4":{"netmask":null}}}}'
  params: []
- id: device_network_ipv4_manual_netmask_set
  label: Manual IPv4 Netmask(s)
  kind: action
  command: '{"device":{"network":{"ipv4":{"manual_netmask":<values>}}}}'
  params:
    - name: values
      type: array
      description: Array of IPv4 netmask strings applied when ipv4/auto=false (default ["255.255.255.0"])
- id: device_network_ipv4_manual_ipaddr_set
  label: Manual IPv4 Address(es)
  kind: action
  command: '{"device":{"network":{"ipv4":{"manual_ipaddr":<values>}}}}'
  params:
    - name: values
      type: array
      description: Array of IPv4 address strings applied when ipv4/auto=false (default ["192.168.178.23"])
- id: device_network_ipv4_manual_gateway_set
  label: Manual IPv4 Gateway(s)
  kind: action
  command: '{"device":{"network":{"ipv4":{"manual_gateway":<values>}}}}'
  params:
    - name: values
      type: array
      description: Array of IPv4 gateway strings applied when ipv4/auto=false (default ["192.168.178.1"])
- id: device_network_ipv4_ipaddr_query
  label: Current IPv4 Address(es)
  kind: query
  command: '{"device":{"network":{"ipv4":{"ipaddr":null}}}}'
  params: []
- id: device_network_ipv4_interfaces_query
  label: Current IPv4 Interface Indexes
  kind: query
  command: '{"device":{"network":{"ipv4":{"interfaces":null}}}}'
  params: []
- id: device_network_ipv4_gateway_query
  label: Current IPv4 Default Gateway(s)
  kind: query
  command: '{"device":{"network":{"ipv4":{"gateway":null}}}}'
  params: []
- id: device_network_ipv4_auto_set
  label: IPv4 DHCP / Auto-IP Toggle
  kind: action
  command: '{"device":{"network":{"ipv4":{"auto":<values>}}}}'
  params:
    - name: values
      type: array
      description: 'Array of booleans (e.g. [true]); true = DHCP+ZeroConf, false = use manual_* settings (SSC ERROR 406 if invalid)'
- id: device_network_mdns_set
  label: mDNS Publication Toggle
  kind: action
  command: '{"device":{"network":{"mdns":<state>}}}'
  params:
    - name: state
      type: boolean
      description: Publish SSC service and hostname via mDNS (default true)

# --- Device time / system metadata ---
- id: device_timeprecision_query
  label: Clock Time Precision
  kind: query
  command: '{"device":{"timeprecision":null}}'
  params: []
- id: device_time_set
  label: Set System Time
  kind: action
  command: '{"device":{"time":<seconds>}}'
  params:
    - name: seconds
      type: integer
      description: Seconds since 2000-01-01T00:00:00Z
- id: device_time_query
  label: System Time
  kind: query
  command: '{"device":{"time":null}}'
  params: []
- id: device_system_set
  label: System Name
  kind: action
  command: '{"device":{"system":<value>}}'
  params:
    - name: value
      type: string
      description: Free-form system label, max length 30 (default "System")
- id: device_position_set
  label: Device Position
  kind: action
  command: '{"device":{"position":<value>}}'
  params:
    - name: value
      type: string
      description: Position within room, max length 30, [A-Za-z0-9 ] only (default "over central table")
- id: device_name_set
  label: Device Name
  kind: action
  command: '{"device":{"name":<value>}}'
  params:
    - name: value
      type: string
      description: 1..8 chars, must start with a letter, end with letter or digit, middle chars may include '-' or '_' (default "SLCM2")
- id: device_location_set
  label: Device Location
  kind: action
  command: '{"device":{"location":<value>}}'
  params:
    - name: value
      type: string
      description: UTF-8 room/building string up to 100 chars (default "Room")
- id: device_language_query
  label: Device Language
  kind: query
  command: '{"device":{"language":null}}'
  params: []
- id: device_date_query
  label: Device Date/Time Stamp (read-only)
  kind: query
  command: '{"device":{"date":null}}'
  params: []

# --- Device lifecycle ---
- id: device_restore_set
  label: Restore Defaults
  kind: action
  command: '{"device":{"restore":<mode>}}'
  params:
    - name: mode
      type: string
      description: 'One of: FACTORY_DEFAULTS (reboots), AUDIO_DEFAULTS (no reboot), DANTE_FACTORY_DEFAULTS (reboots)'
- id: device_restart_set
  label: Reboot Device
  kind: action
  command: '{"device":{"restart":<state>}}'
  params:
    - name: state
      type: boolean
      description: Reboots SLCM2

# --- Interface metadata ---
- id: interface_version_query
  label: SSC Tree / Interface Version
  kind: query
  command: '{"interface":{"version":null}}'
  params: []

# --- Audio: equalizer ---
- id: audio_equalizer_preset_set
  label: Equalizer Preset Mode
  kind: action
  command: '{"audio":{"equalizer":{"preset":<mode>}}}'
  params:
    - name: mode
      type: string
      description: 'One of: OFF (bypass EQ), CUSTOM (activate custom EQ) (default OFF)'
- id: audio_equalizer_custom_set
  label: 7-Band Graphic EQ Gains
  kind: action
  command: '{"audio":{"equalizer":{"custom":<gains>}}}'
  params:
    - name: gains
      type: array
      description: 'Array of 7 numbers, bands at 125/250/500/1000/2000/4000/8000 Hz, Q=1.4142, range -8..+8 in 0.5 dB steps (default [0,0,0,0,0,0,0])'
- id: audio_equalizer_custom_query
  label: 7-Band Graphic EQ Gains Query
  kind: query
  command: '{"audio":{"equalizer":{"custom":null}}}'
  params: []

# --- Audio: exclusion zones (current API) ---
- id: audio_exclusion_zones_set
  label: Exclusion Zones Array
  kind: action
  command: '{"audio":{"exclusion":{"zones":<zones>}}}'
  params:
    - name: zones
      type: array
      description: 'Up to 5 zones, each [elevMin,elevMax,aziMin,aziMax]; elevation 0..90, azimuth 0..360, step 5°, min aperture 10°; null leaves a zone or angle unchanged'
- id: audio_exclusion_zones_query
  label: Exclusion Zones Array Query
  kind: query
  command: '{"audio":{"exclusion":{"zones":null}}}'
  params: []
- id: audio_exclusion_active_set
  label: Exclusion Zone Active Flags
  kind: action
  command: '{"audio":{"exclusion":{"active":<flags>}}}'
  params:
    - name: flags
      type: array
      description: Array of 5 booleans, one per zone (default [true,false,false,false,false]); null leaves flag unchanged
- id: audio_exclusion_active_query
  label: Exclusion Zone Active Flags Query
  kind: query
  command: '{"audio":{"exclusion":{"active":null}}}'
  params: []

# --- Audio: exclusion zones (deprecated per-source API; listed as separate rows) ---
- id: audio_exclusion_zone_azimuth_1_set
  label: 'DEPRECATED: Exclusion Zone 1 Azimuth'
  kind: action
  command: '{"audio":{"exclusion_zone":{"azimuth":{"1":<angles>}}}}'
  params:
    - name: angles
      type: array
      description: '[min,max] degrees, max 360 (default [0,0])'
- id: audio_exclusion_zone_azimuth_2_set
  label: 'DEPRECATED: Exclusion Zone 2 Azimuth'
  kind: action
  command: '{"audio":{"exclusion_zone":{"azimuth":{"2":<angles>}}}}'
  params:
    - name: angles
      type: array
      description: '[min,max] degrees, max 360 (default [0,0])'
- id: audio_exclusion_zone_azimuth_3_set
  label: 'DEPRECATED: Exclusion Zone 3 Azimuth'
  kind: action
  command: '{"audio":{"exclusion_zone":{"azimuth":{"3":<angles>}}}}'
  params:
    - name: angles
      type: array
      description: '[min,max] degrees, max 360 (default [0,0])'
- id: audio_exclusion_zone_elevation_1_set
  label: 'DEPRECATED: Exclusion Zone 1 Elevation'
  kind: action
  command: '{"audio":{"exclusion_zone":{"elevation":{"1":<angles>}}}}'
  params:
    - name: angles
      type: array
      description: '[min,max] degrees, max 75 (default [0,10])'

# --- Audio: noise gate ---
- id: audio_noise_gate_threshold_set
  label: Noise Gate Threshold
  kind: action
  command: '{"audio":{"noise_gate":{"threshold":<value>}}}'
  params:
    - name: value
      type: number
      description: dB, range -90..-40
- id: audio_noise_gate_threshold_query
  label: Noise Gate Threshold Query
  kind: query
  command: '{"audio":{"noise_gate":{"threshold":null}}}'
  params: []
- id: audio_noise_gate_hold_time_set
  label: Noise Gate Hold Time
  kind: action
  command: '{"audio":{"noise_gate":{"hold_time":<value>}}}'
  params:
    - name: value
      type: integer
      description: ms, range 50..1000
- id: audio_noise_gate_hold_time_query
  label: Noise Gate Hold Time Query
  kind: query
  command: '{"audio":{"noise_gate":{"hold_time":null}}}'
  params: []
- id: audio_noise_gate_active_set
  label: Noise Gate Active
  kind: action
  command: '{"audio":{"noise_gate":{"active":<state>}}}'
  params:
    - name: state
      type: boolean

# --- Audio: out1 (analog out) ---
- id: audio_out1_label_query
  label: Analog Out Label
  kind: query
  command: '{"audio":{"out1":{"label":null}}}'
  params: []
- id: audio_out1_desc_query
  label: Analog Out Description
  kind: query
  command: '{"audio":{"out1":{"desc":null}}}'
  params: []
- id: audio_out1_attenuation_set
  label: Analog Out Attenuation
  kind: action
  command: '{"audio":{"out1":{"attenuation":<value>}}}'
  params:
    - name: value
      type: number
      description: dB, range -18..0 (default 0)
- id: audio_out1_attenuation_query
  label: Analog Out Attenuation Query
  kind: query
  command: '{"audio":{"out1":{"attenuation":null}}}'
  params: []

# --- Audio: out2 (Dante) identity / network ---
- id: audio_out2_identity_version_query
  label: Dante Interface Software Version
  kind: query
  command: '{"audio":{"out2":{"identity":{"version":null}}}}'
  params: []
- id: audio_out2_network_ether_macs_query
  label: Dante MAC Addresses
  kind: query
  command: '{"audio":{"out2":{"network":{"ether":{"macs":null}}}}}'
  params: []
- id: audio_out2_network_ether_interfaces_query
  label: Dante IPv4 Interface Names
  kind: query
  command: '{"audio":{"out2":{"network":{"ether":{"interfaces":null}}}}}'
  params: []
- id: audio_out2_network_ether_interface_mapping_set
  label: Dante Network Port Configuration (reboots device)
  kind: action
  command: '{"audio":{"out2":{"network":{"ether":{"interface_mapping":<mode>}}}}}'
  params:
    - name: mode
      type: string
      description: 'One of: AUDIO_SWITCHED, AUDIO_REDUNDANT'
- id: audio_out2_network_ether_interface_mapping_query
  label: Dante Network Port Configuration Query
  kind: query
  command: '{"audio":{"out2":{"network":{"ether":{"interface_mapping":null}}}}}'
  params: []
- id: audio_out2_network_ipv4_netmask_query
  label: Dante Current IPv4 Netmask(s)
  kind: query
  command: '{"audio":{"out2":{"network":{"ipv4":{"netmask":null}}}}}'
  params: []
- id: audio_out2_network_ipv4_manual_ipaddr_set
  label: Dante Manual IPv4 Address(es)
  kind: action
  command: '{"audio":{"out2":{"network":{"ipv4":{"manual_ipaddr":<values>}}}}}'
  params:
    - name: values
      type: array
      description: Array of 2 IPv4 address strings for primary/secondary (default ["169.254.10.10","172.31.10.10"])
- id: audio_out2_network_ipv4_manual_ipaddr_query
  label: Dante Manual IPv4 Address(es) Query
  kind: query
  command: '{"audio":{"out2":{"network":{"ipv4":{"manual_ipaddr":null}}}}}'
  params: []
- id: audio_out2_network_ipv4_manual_gateway_set
  label: Dante Manual IPv4 Gateway(s)
  kind: action
  command: '{"audio":{"out2":{"network":{"ipv4":{"manual_gateway":<values>}}}}}'
  params:
    - name: values
      type: array
      description: Array of 2 IPv4 gateway strings (default ["169.254.2.1","172.31.2.2"])
- id: audio_out2_network_ipv4_manual_gateway_query
  label: Dante Manual IPv4 Gateway(s) Query
  kind: query
  command: '{"audio":{"out2":{"network":{"ipv4":{"manual_gateway":null}}}}}'
  params: []
- id: audio_out2_network_ipv4_ipaddr_query
  label: Dante Current IPv4 Address(es)
  kind: query
  command: '{"audio":{"out2":{"network":{"ipv4":{"ipaddr":null}}}}'
  params: []
- id: audio_out2_network_ipv4_interfaces_query
  label: Dante Current IPv4 Interface Indexes
  kind: query
  command: '{"audio":{"out2":{"network":{"ipv4":{"interfaces":null}}}}}'
  params: []
- id: audio_out2_network_ipv4_gateway_query
  label: Dante Current IPv4 Default Gateway(s)
  kind: query
  command: '{"audio":{"out2":{"network":{"ipv4":{"gateway":null}}}}}'
  params: []
- id: audio_out2_network_ipv4_auto_set
  label: Dante IPv4 DHCP / Auto-IP Toggle (reboots device)
  kind: action
  command: '{"audio":{"out2":{"network":{"ipv4":{"auto":<values>}}}}}'
  params:
    - name: values
      type: array
      description: 'Array of 2 booleans for primary/secondary; true=DHCP+ZeroConf, false=use manual_* (SSC ERROR 406 if invalid) (default [true,true])'
- id: audio_out2_network_ipv4_auto_query
  label: Dante IPv4 DHCP / Auto-IP Toggle Query
  kind: query
  command: '{"audio":{"out2":{"network":{"ipv4":{"auto":null}}}}}'
  params: []
- id: audio_out2_label_query
  label: Dante Out Label
  kind: query
  command: '{"audio":{"out2":{"label":null}}}'
  params: []
- id: audio_out2_gain_set
  label: Dante Output Gain
  kind: action
  command: '{"audio":{"out2":{"gain":<value>}}}'
  params:
    - name: value
      type: number
      description: dB, max 24 (default 12); min UNRESOLVED (source does not state minimum)
- id: audio_out2_gain_query
  label: Dante Output Gain Query
  kind: query
  command: '{"audio":{"out2":{"gain":null}}}'
  params: []
- id: audio_out2_desc_query
  label: Dante Out Description
  kind: query
  command: '{"audio":{"out2":{"desc":null}}}'
  params: []

# --- Audio: priority zones (beam-steering prioritization) ---
- id: audio_priority_zones_set
  label: Priority Zones Array
  kind: action
  command: '{"audio":{"priority":{"zones":<zone>}}}'
  params:
    - name: zone
      type: array
      description: '[elevMin,elevMax,aziMin,aziMax] (default [60,80,160,200])'
- id: audio_priority_zones_query
  label: Priority Zones Array Query
  kind: query
  command: '{"audio":{"priority":{"zones":null}}}'
  params: []
- id: audio_priority_weights_set
  label: Priority Zone Weights
  kind: action
  command: '{"audio":{"priority":{"weights":<values>}}}'
  params:
    - name: values
      type: array
      description: Per-zone weights, range 1..4 in 0.1 steps (1.0 = neutral) (default [1.5])
- id: audio_priority_weights_query
  label: Priority Zone Weights Query
  kind: query
  command: '{"audio":{"priority":{"weights":null}}}'
  params: []
- id: audio_priority_active_set
  label: Priority Zone Active
  kind: action
  command: '{"audio":{"priority":{"active":<values>}}}'
  params:
    - name: values
      type: array
      description: Boolean array (e.g. [false]); scalar boolean also accepted; response always array
- id: audio_priority_active_query
  label: Priority Zone Active Query
  kind: query
  command: '{"audio":{"priority":{"active":null}}}'
  params: []

# --- Audio: ref1 (AEC reference) ---
- id: audio_ref1_label_query
  label: Dante Ref Label
  kind: query
  command: '{"audio":{"ref1":{"label":null}}}'
  params: []
- id: audio_ref1_gain_set
  label: AEC Reference Gain
  kind: action
  command: '{"audio":{"ref1":{"gain":<value>}}}'
  params:
    - name: value
      type: number
      description: dB, range -60..+10 (default 0)
- id: audio_ref1_gain_query
  label: AEC Reference Gain Query
  kind: query
  command: '{"audio":{"ref1":{"gain":null}}}'
  params: []
- id: audio_ref1_farend_auto_adjust_enable_set
  label: Far-End Auto-Adjust (NFE) Enable
  kind: action
  command: '{"audio":{"ref1":{"farend_auto_adjust_enable":<state>}}}'
  params:
    - name: state
      type: boolean
      description: Enable automatic threshold adjustment based on noise floor estimation
- id: audio_ref1_farend_auto_adjust_enable_query
  label: Far-End Auto-Adjust (NFE) Enable Query
  kind: query
  command: '{"audio":{"ref1":{"farend_auto_adjust_enable":null}}}'
  params: []
- id: audio_ref1_desc_query
  label: AEC Ref Description
  kind: query
  command: '{"audio":{"ref1":{"desc":null}}}'
  params: []

# --- Audio: source detection ---
- id: audio_source_detection_threshold_set
  label: Source Detection Threshold
  kind: action
  command: '{"audio":{"source_detection":{"threshold":<mode>}}}'
  params:
    - name: mode
      type: string
      description: 'One of: quiet_room, normal_room, loud_room (default normal_room)'
- id: audio_source_detection_threshold_query
  label: Source Detection Threshold Query
  kind: query
  command: '{"audio":{"source_detection":{"threshold":null}}}'
  params: []

# --- Audio: voice lift ---
- id: audio_voice_lift_emergency_mute_time_set
  label: Voice-Lift Emergency Mute Time
  kind: action
  command: '{"audio":{"voice_lift":{"emergency_mute_time":<value>}}}'
  params:
    - name: value
      type: number
      description: seconds, range 1..30 in 1-step increments
- id: audio_voice_lift_emergency_mute_time_query
  label: Voice-Lift Emergency Mute Time Query
  kind: query
  command: '{"audio":{"voice_lift":{"emergency_mute_time":null}}}'
  params: []
- id: audio_voice_lift_emergency_mute_threshold_set
  label: Voice-Lift Emergency Mute Threshold
  kind: action
  command: '{"audio":{"voice_lift":{"emergency_mute_threshold":<value>}}}'
  params:
    - name: value
      type: number
      description: dB, range -50..-3 (default -20)
- id: audio_voice_lift_emergency_mute_threshold_query
  label: Voice-Lift Emergency Mute Threshold Query
  kind: query
  command: '{"audio":{"voice_lift":{"emergency_mute_threshold":null}}}'
  params: []
- id: audio_voice_lift_active_set
  label: Voice-Lift Active
  kind: action
  command: '{"audio":{"voice_lift":{"active":<state>}}}'
  params:
    - name: state
      type: boolean
      description: Activates feedback-mitigation algorithms on the microphone output
- id: audio_voice_lift_active_query
  label: Voice-Lift Active Query
  kind: query
  command: '{"audio":{"voice_lift":{"active":null}}}'
  params: []

# --- Audio: room / mute / installation ---
- id: audio_room_in_use_query
  label: Room-In-Use (Near-End Activity Flag)
  kind: query
  command: '{"audio":{"room_in_use":null}}'
  params: []
- id: audio_mute_set
  label: Mute Microphone Outputs
  kind: action
  command: '{"audio":{"mute":<state>}}'
  params:
    - name: state
      type: boolean
      description: true mutes the audio outputs
- id: audio_mute_query
  label: Mute State Query
  kind: query
  command: '{"audio":{"mute":null}}'
  params: []
- id: audio_installation_type_set
  label: Installation Type
  kind: action
  command: '{"audio":{"installation_type":<mode>}}'
  params:
    - name: mode
      type: string
      description: 'One of: flush_mount (on ceiling), suspended (≥30 cm from ceiling) (default flush_mount)'
- id: audio_installation_type_query
  label: Installation Type Query
  kind: query
  command: '{"audio":{"installation_type":null}}'
  params: []

# --- Beam orientation ---
- id: beam_orientation_visual_set
  label: Beam Orientation Visual (LED indicator)
  kind: action
  command: '{"beam":{"orientation":{"visual":<state>}}}'
  params:
    - name: state
      type: boolean
      description: Two LEDs indicate orientation (green=right, red=left) for 0° reference
- id: beam_orientation_visual_query
  label: Beam Orientation Visual Query
  kind: query
  command: '{"beam":{"orientation":{"visual":null}}}'
  params: []
- id: beam_orientation_offset_set
  label: Beam Orientation Offset
  kind: action
  command: '{"beam":{"orientation":{"offset":<degrees>}}}'
  params:
    - name: degrees
      type: integer
      description: 'One of: 0, 90, 180, 270 (default 0)'
- id: beam_orientation_offset_query
  label: Beam Orientation Offset Query
  kind: query
  command: '{"beam":{"orientation":{"offset":null}}}'
  params: []

# --- SSC meta-protocol methods (§7.88 - §7.101) ---
- id: osc_state_auth_access_query
  label: SSC Access Rights Reflection
  kind: query
  command: '{"osc":{"state":{"auth":{"access":null}}}}'
  params: []
- id: osc_state_prettyprint_query
  label: Prettyprint Support (always false on TCC2)
  kind: query
  command: '{"osc":{"state":{"prettyprint":null}}}'
  params: []
- id: osc_state_close_set
  label: Close SSC Session
  kind: action
  command: '{"osc":{"state":{"close":<state>}}}'
  params:
    - name: state
      type: boolean
      description: 'true terminates the SSC session; on TCP the server closes the connection after the reply'
- id: osc_state_subscribe
  label: SSC Subscribe
  kind: action
  command: '{"osc":{"state":{"subscribe":<address_tree>}}}'
  params:
    - name: address_tree
      type: object
      description: SSC Address Tree (optionally with "#" parameter object for min/max/bw/count/lifetime/cancel)
- id: osc_state_subscribe_query
  label: Active Subscriptions Query
  kind: query
  command: '{"osc":{"state":{"subscribe":null}}}'
  params: []
- id: osc_feature_timetag_query
  label: Timetag Feature Support (always false on TCC2)
  kind: query
  command: '{"osc":{"feature":{"timetag":null}}}'
  params: []
- id: osc_feature_baseaddr_query
  label: Base-Address Feature Support (always false on TCC2)
  kind: query
  command: '{"osc":{"feature":{"baseaddr":null}}}'
  params: []
- id: osc_feature_subscription_query
  label: Subscription Feature Support (always true on TCC2)
  kind: query
  command: '{"osc":{"feature":{"subscription":null}}}'
  params: []
- id: osc_feature_pattern_query
  label: Address-Pattern Feature Support (returns "*?" on TCC2)
  kind: query
  command: '{"osc":{"feature":{"pattern":null}}}'
  params: []
- id: osc_limits_query
  label: SSC Method Parameter Range Reflection
  kind: query
  command: '{"osc":{"limits":<address_tree>}}'
  params:
    - name: address_tree
      type: object
      description: SSC Address Tree whose limits are being queried (null queries root)
- id: osc_schema_query
  label: SSC Schema Reflection
  kind: query
  command: '{"osc":{"schema":<address_tree>}}'
  params:
    - name: address_tree
      type: object
      description: SSC Address Tree whose schema is being queried (null queries root)
- id: osc_version_query
  label: SSC Protocol Version
  kind: query
  command: '{"osc":{"version":null}}'
  params: []
- id: osc_xid_set
  label: SSC Transaction ID
  kind: action
  command: '{"osc":{"xid":<value>}}'
  params:
    - name: value
      type: any
      description: Client-supplied transaction ID reflected back by server
- id: osc_xid_query
  label: SSC Transaction ID Query
  kind: query
  command: '{"osc":{"xid":null}}'
  params: []
- id: osc_ping
  label: SSC Ping
  kind: action
  command: '{"osc":{"ping":<value>}}'
  params:
    - name: value
      type: any
      description: 'null or an arbitrary value/array; server echoes back verbatim'
- id: osc_error_query
  label: SSC Error State
  kind: query
  command: '{"osc":{"error":null}}'
  params: []
```

## Feedbacks
```yaml
# One entry per observable/subscribable state the device reports. Per source
# §7, the following methods are explicitly marked subscr:true or have subscribe
# examples; the device also pushes unsolicited subscription notifications and
# error replies via /osc/error.
- id: beam_elevation
  type: number
  units: degree
  range: [0, 90]
- id: beam_azimuth
  type: number
  units: degree
  range: [0, 359]
- id: in1_peak
  type: number
  units: dB
  range: [-90, 0]
- id: ref1_rms
  type: number
  units: dBfs
  range: [-120, 0]
- id: device_identification_visual
  type: boolean
- id: device_button_state
  type: boolean
- id: device_update_progress
  type: number
  range: [0, 100]
- id: device_update_error
  type: string  # UNRESOLVED: source does not enumerate error result strings
- id: device_update_enable
  type: boolean
- id: device_led_custom_color
  type: enum
  values: [LIGHT GREEN, GREEN, BLUE, RED, YELLOW, ORANGE, CYAN, PINK]
- id: device_led_custom_active
  type: boolean
- id: device_led_mic_mute_color
  type: enum
  values: [LIGHT GREEN, GREEN, BLUE, RED, YELLOW, ORANGE, CYAN, PINK]
- id: device_led_mic_on_color
  type: enum
  values: [LIGHT GREEN, GREEN, BLUE, RED, YELLOW, ORANGE, CYAN, PINK]
- id: device_led_show_farend_activity
  type: boolean
- id: device_led_brightness
  type: integer
  range: [0, 5]
- id: device_network_ipv4_netmask
  type: array  # UNRESOLVED: element shape not further described
- id: device_network_ipv4_manual_netmask
  type: array
- id: device_network_ipv4_manual_ipaddr
  type: array
- id: device_network_ipv4_manual_gateway
  type: array
- id: device_network_ipv4_ipaddr
  type: array
- id: device_network_ipv4_interfaces
  type: array
- id: device_network_ipv4_gateway
  type: array
- id: device_network_ipv4_auto
  type: array
- id: device_network_mdns
  type: boolean
- id: device_system
  type: string
  length: 30
- id: device_position
  type: string
  length: 30
- id: device_name
  type: string
  length: 8
- id: device_location
  type: string
  length: 100
- id: audio_equalizer_preset
  type: enum
  values: [OFF, CUSTOM]
- id: audio_equalizer_custom
  type: array
  count: 7
  range: [-8, 8]
- id: audio_exclusion_zones
  type: array
  count: 5
- id: audio_exclusion_active
  type: array
  count: 5
- id: audio_noise_gate_threshold
  type: number
  range: [-90, -40]
- id: audio_noise_gate_hold_time
  type: integer
  units: ms
  range: [50, 1000]
- id: audio_noise_gate_active
  type: boolean
- id: audio_out1_attenuation
  type: number
  range: [-18, 0]
- id: audio_out2_network_ipv4_netmask
  type: array
- id: audio_out2_network_ipv4_manual_ipaddr
  type: array
  count: 2
- id: audio_out2_network_ipv4_manual_gateway
  type: array
- id: audio_out2_network_ipv4_ipaddr
  type: array
- id: audio_out2_network_ipv4_interfaces
  type: array
- id: audio_out2_network_ipv4_gateway
  type: array
- id: audio_out2_network_ipv4_auto
  type: array
- id: audio_out2_gain
  type: number
  # range max 24 stated; min UNRESOLVED in source
- id: audio_priority_zones
  type: array
- id: audio_priority_weights
  type: array
  range: [1, 4]
- id: audio_priority_active
  type: array
- id: audio_ref1_gain
  type: number
  units: dB
  range: [-60, 10]
- id: audio_ref1_farend_auto_adjust_enable
  type: boolean
- id: audio_source_detection_threshold
  type: enum
  values: [quiet_room, normal_room, loud_room]
- id: audio_voice_lift_emergency_mute_time
  type: number
  units: s
  range: [1, 30]
- id: audio_voice_lift_emergency_mute_threshold
  type: number
  range: [-50, -3]
- id: audio_voice_lift_active
  type: boolean
- id: audio_room_in_use
  type: boolean
- id: audio_mute
  type: boolean
- id: audio_installation_type
  type: enum
  values: [flush_mount, suspended]
- id: beam_orientation_visual
  type: boolean
- id: beam_orientation_offset
  type: enum
  values: [0, 90, 180, 270]
```

## Variables
```yaml
# All settable parameters are already represented as Actions above (SSC does not
# distinguish "variables" from "setters"). This section is intentionally empty.
```

## Events
```yaml
# Unsolicited notifications the device sends.
# Per source §5.1.9, subscription notifications are pushed to the client on
# value change of any subscribed address; initial notification sent on
# subscription acceptance. The device also emits /osc/error messages on
# faulty method calls (source §5.1.2). Specific event types beyond the
# subscription mechanism are not separately enumerated in the source.
- id: subscription_notification
  description: Push message containing the current value(s) of subscribed SSC addresses
- id: error_notification
  description: /osc/error reply emitted on faulty SSC method calls; carries SMTP/HTTP-style 3-digit code + human-readable desc
# UNRESOLVED: source does not document any device-emitted events independent of the subscription mechanism
```

## Macros
```yaml
# UNRESOLVED: source documents multi-method SSC transactions (multiple keys in
# one JSON object) but does not enumerate any named multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Operations with safety/lifecycle impact noted in source (not formal
# interlocks, listed for operator awareness):
#   - device/restore = FACTORY_DEFAULTS / DANTE_FACTORY_DEFAULTS  -> device reboots
#   - device/restore = AUDIO_DEFAULTS                              -> audio reset, no reboot
#   - device/restart                                               -> device reboots
#   - device/update/enable = true                                  -> firmware update, client cannot abort
#   - audio/out2/network/ether/interface_mapping change            -> device reboots
#   - audio/out2/network/ipv4/auto change                          -> device reboots
# UNRESOLVED: source contains no formal safety interlock procedures or
# confirmation sequences.
```

## Notes
- SSC = "Sennheiser Sound Control", a JSON-encoded adaptation of Open Sound Control (OSC) v1.1 (source §1, §2). Network audio streaming is explicitly out of scope.
- The device is referred to internally as **SLCM2** (Sennheiser Linear Condenser Microphone 2) in the source.
- SSC Messages over TCP / serial byte-stream MUST be terminated by either CRLF (`\r\n`) or LF+LF (`\n\n`) (source §6.2, §6.8, §6.10). One UDP datagram carries one SSC Message (source §6.1).
- JSON `null` as a method argument is the SSC query idiom: it requests the current value without side effects (source §4.3.3).
- Out-of-range setter arguments are silently adapted by the device (response echoes the resulting value); this is not treated as an error (source §4.2).
- Error codes are 3-digit SMTP/HTTP-style codes (source §5.1.2, §9). Common ones on this device: 200 OK, 202 adapted, 404 not found, 406 not acceptable, 414 request too complex, 416 range not satisfiable, 501 not implemented.
- DNS-SD service discovery: `_ssc._udp` mandatory; `_ssc._tcp` only published by devices that implement TCP transport (source §6.5). The default UDP/TCP port is 45 (non-standard; rationale "Sennheiser was founded in 1945").
- The HTTP transport (if implemented) defaults to URL path `/ssc` and port 80/443; SSC addresses may be appended to the HTTP request URL (source §6.3).
- SSC string characters are restricted to ASCII 32–126 excluding `"`, `/`, `\`, with no `\b\f\r\n\t` escapes and no `\uXXXX` patterns (source §8).

<!-- UNRESOLVED: voltage / current / power specs not in this document -->
<!-- UNRESOLVED: TCP and HTTP transport support not explicitly confirmed for TCC2 firmware -->
<!-- UNRESOLVED: authentication procedure (TANs / access policy) documented generically in §5.1.14 and hinted by /osc/state/auth/access but no TCC2-specific credentials or login flow given -->
<!-- UNRESOLVED: minimum value of /audio/out2/gain not stated (only default 12 and max 24) -->
<!-- UNRESOLVED: exact contents of /device/update/error result strings not enumerated -->

## Provenance

```yaml
source_domains:
  - assets.sennheiser.com
  - docs.cloud.sennheiser.com
  - github.com
source_urls:
  - https://assets.sennheiser.com/download/assets/TI_1245_v1.8.0_Sennheiser_Sound_Control_Protocol_TCC2_EN.pdf/c204169ce7bb11f0a354ea55b5d2fb86
  - "https://assets.sennheiser.com/download/assets/EW-DX_Sound_Control_Protocol_03_2023_EN.pdf/69f9d4bee7b611f0ae307aeaa9c3764a?attachment=true"
  - https://docs.cloud.sennheiser.com/en-us/api-docs/api-docs/sound-control-protocol.html
  - https://docs.cloud.sennheiser.com/en-us/api-docs/index.html
  - https://github.com/chetan-prime/sennheiser-tcc-m-api
retrieved_at: 2026-06-18T01:55:07.954Z
last_checked_at: 2026-06-18T08:02:17.367Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:02:17.367Z
matched_actions: 129
action_count: 129
confidence: medium
summary: "All 129 spec actions have verbatim command-payload matches in source 7.1-7.101; transport port 45 and DNS-SD _ssc._udp confirmed. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The source is the generic SSC protocol spec + TCC2 method list. It explicitly states UDP/IP as the mandatory transport (default port 45) and describes TCP/IP and HTTP/TCP as OPTIONAL transports in the generic SSC spec, but does not explicitly state which optional transports the TCC2 firmware actually implements."
- "TCC2 exposes /osc/state/auth/access, hinting at an access-control mechanism, but no credentials, token format, or login procedure is documented for TCC2."
- "Power supply / voltage / current ratings not in this document."
- "source exposes /osc/state/auth/access (§7.88) but does not document a TCC2 login/credential procedure"
- "source does not enumerate error result strings"
- "element shape not further described"
- "source does not document any device-emitted events independent of the subscription mechanism"
- "source documents multi-method SSC transactions (multiple keys in"
- "source contains no formal safety interlock procedures or"
- "voltage / current / power specs not in this document"
- "TCP and HTTP transport support not explicitly confirmed for TCC2 firmware"
- "authentication procedure (TANs / access policy) documented generically in §5.1.14 and hinted by /osc/state/auth/access but no TCC2-specific credentials or login flow given"
- "minimum value of /audio/out2/gain not stated (only default 12 and max 24)"
- "exact contents of /device/update/error result strings not enumerated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
