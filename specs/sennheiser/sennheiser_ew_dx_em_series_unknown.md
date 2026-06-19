---
spec_id: admin/sennheiser-ew-dx-em-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sennheiser EW-DX EM Series Control Spec"
manufacturer: Sennheiser
model_family: "EW-DX EM 2"
aliases: []
compatible_with:
  manufacturers:
    - Sennheiser
  models:
    - "EW-DX EM 2"
    - "EW-DX EM 2 Dante"
    - "EW-DX EM 4 Dante"
  firmware: 3.0.x
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.cloud.sennheiser.com
  - assets.sennheiser.com
source_urls:
  - https://docs.cloud.sennheiser.com/en-us/api-docs/api-docs/resources/ew-dx-sound-control-protocol-3-0-x.pdf
  - "https://assets.sennheiser.com/download/assets/EW-DX_Sound_Control_Protocol_03_2023_EN.pdf/69f9d4bee7b611f0ae307aeaa9c3764a?attachment=true"
  - "https://assets.sennheiser.com/download/assets/EW-DX_Sound_Control_Protocol_v2_FW-4.0.x_EN.pdf/9a1f7d8ee7d811f0b5b3768ee8e97aea?attachment=true"
  - "https://assets.sennheiser.com/download/assets/Sennheiser_EW-DX_Crestron_Modules.zip/64bbb61ce7d811f0bce7beb43c66122a?attachment=true"
  - "https://assets.sennheiser.com/download/assets/Sennheiser_EW-DX_Q-SYS_Plugins.zip/5c4e0868e7d811f0bce7beb43c66122a?attachment=true"
retrieved_at: 2026-06-18T01:45:51.827Z
last_checked_at: 2026-06-18T08:02:16.648Z
generated_at: 2026-06-18T08:02:16.648Z
firmware_coverage: 3.0.x
protocol_coverage: []
known_gaps:
  - "source also documents the CHG 70N-C charger (separate product, section 11–14); not enumerated here as compatible_with.models lists only EM receivers."
  - "bay_state documented only under CHG 70N-C chapter; not enumerated for EM."
  - "source contains no safety warnings, interlock procedures, or"
  - "source also documents CHG 70N-C / CHG 70N charger (sections 11–14). That product is out of scope for this EM receiver family spec; a separate spec should be authored if charger control is needed."
  - "TCP transport is referenced generically in the SSC framework chapter but the EW-DX server explicitly supports UDP/IP only."
  - "exact device voltage / power / current specifications not present in this developer guide."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:02:16.648Z
  matched_actions: 249
  action_count: 249
  confidence: medium
  summary: "All 249 spec action units have exact SSC address-path matches in the source EW-DX EM method list; transport port 45 and DNS-SD discovery explicitly stated. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-18
---

# Sennheiser EW-DX EM Series Control Spec

## Summary
Sennheiser EW-DX EM 2 / EM 2 Dante / EM 4 Dante rack receivers, controlled via Sennheiser Sound Control (SSC) — an OSC-derived protocol using JSON message encoding over UDP/IP. Covers device identity, network configuration, RF channel management (1–4 receiver channels depending on model), audio output levels, metering, transmitter mate telemetry, and subscriptions.

<!-- UNRESOLVED: source also documents the CHG 70N-C charger (separate product, section 11–14); not enumerated here as compatible_with.models lists only EM receivers. -->

## Transport
```yaml
protocols:
  - udp
  - osc
# SSC = OSC-derived JSON-encoded messages carried in UDP/IP datagrams.
# EW-DX server supports UDP/IP only (no TCP). IPv4 only.
addressing:
  port: 45
  # default UDP port per source; SHOULD be discovered via DNS-SD (_ssc._udp)
discovery:
  type: dns_sd
  service_type: _ssc._udp
auth:
  type: none  # inferred: no auth procedure described in source
```

## Traits
```yaml
# - levelable   # inferred from gain/frequency/level settable numeric ranges
# - queryable   # inferred from null-argument getter pattern documented throughout
# - muteable    # inferred from rx/mute commands per channel
```

## Actions
```yaml
# Each action = one documented SSC method address. SSC uses JSON object form
# with property path matching the OSC address. Getter = null argument.
# Dante-exclusive methods apply to EW-DX EM 2 Dante and EW-DX EM 4 Dante only.
# EM 4 Dante-exclusive methods (rx3/rx4, booster) apply to EW-DX EM 4 Dante only.

# ---- /device ----
- id: device_identification_visual
  label: Device Identification Visual
  kind: action
  command: '{"device":{"identification":{"visual":{value}}}}'
  params:
    - name: value
      type: boolean
      description: "true=start, false=stop, null=read status"

- id: device_identity_version
  label: Device Product Version
  kind: query
  command: '{"device":{"identity":{"version":null}}}'
  params: []

- id: device_identity_vendor
  label: Device Vendor
  kind: query
  command: '{"device":{"identity":{"vendor":null}}}'
  params: []

- id: device_identity_serial
  label: Device Serial
  kind: query
  command: '{"device":{"identity":{"serial":null}}}'
  params: []
  notes: "Source: not yet implemented."

- id: device_identity_product
  label: Device Product Label
  kind: query
  command: '{"device":{"identity":{"product":null}}}'
  params: []

- id: device_network_dante_identity_version
  label: Dante SW Version
  kind: query
  command: '{"device":{"network":{"dante":{"identity":{"version":null}}}}}'
  params: []
  notes: "EW-DX EM 2 Dante and EW-DX EM 4 Dante exclusive."

- id: device_network_dante_ipv4_netmask
  label: Dante IPv4 Netmask
  kind: query
  command: '{"device":{"network":{"dante":{"ipv4":{"netmask":null}}}}}'
  params: []
  notes: "Dante exclusive. Array [primary, secondary]."

- id: device_network_dante_ipv4_manual_netmask
  label: Dante Manual IPv4 Netmask
  kind: action
  command: '{"device":{"network":{"dante":{"ipv4":{"manual_netmask":{value}}}}}}'
  params:
    - name: value
      type: array
      description: "Array of strings e.g. [\"255.255.255.0\",\"255.255.255.0\"]"
  notes: "Dante exclusive."

- id: device_network_dante_ipv4_manual_ipaddr
  label: Dante Manual IPv4 Address
  kind: action
  command: '{"device":{"network":{"dante":{"ipv4":{"manual_ipaddr":{value}}}}}}'
  params:
    - name: value
      type: array
      description: "Array of strings e.g. [\"192.168.1.10\",\"192.168.2.10\"]"
  notes: "Dante exclusive."

- id: device_network_dante_ipv4_manual_gateway
  label: Dante Manual IPv4 Gateway
  kind: action
  command: '{"device":{"network":{"dante":{"ipv4":{"manual_gateway":{value}}}}}}'
  params:
    - name: value
      type: array
      description: "Array of strings e.g. [\"192.168.1.1\",\"192.168.2.1\"]"
  notes: "Dante exclusive."

- id: device_network_dante_ipv4_ipaddr
  label: Dante IPv4 Address
  kind: query
  command: '{"device":{"network":{"dante":{"ipv4":{"ipaddr":null}}}}}'
  params: []
  notes: "Dante exclusive."

- id: device_network_dante_ipv4_gateway
  label: Dante IPv4 Gateway
  kind: query
  command: '{"device":{"network":{"dante":{"ipv4":{"gateway":null}}}}}'
  params: []
  notes: "Dante exclusive."

- id: device_network_dante_ipv4_auto
  label: Dante Auto-IP/DHCP
  kind: action
  command: '{"device":{"network":{"dante":{"ipv4":{"auto":{value}}}}}}'
  params:
    - name: value
      type: array
      description: "Booleans [primary, secondary]; true=Auto-IP/DHCP, false=Manual"
  notes: "Dante exclusive."

- id: device_network_dante_macs
  label: Dante MAC Addresses
  kind: query
  command: '{"device":{"network":{"dante":{"macs":null}}}}'
  params: []
  notes: "Dante exclusive."

- id: device_network_dante_interfaces
  label: Dante Interface Names
  kind: query
  command: '{"device":{"network":{"dante":{"interfaces":null}}}}'
  params: []
  notes: "Dante exclusive."

- id: device_network_dante_interface_mapping
  label: Dante Interface Mapping
  kind: action
  command: '{"device":{"network":{"dante":{"interface_mapping":{value}}}}}'
  params:
    - name: value
      type: string
      description: "One of SINGLE_CABLE, SPLIT1, SPLIT2, SPLIT, AUDIO_REDUNDANCY"
  notes: "Dante exclusive."

- id: device_network_ether_macs
  label: Ethernet MAC Addresses
  kind: query
  command: '{"device":{"network":{"ether":{"macs":null}}}}'
  params: []

- id: device_network_ether_interfaces
  label: Ethernet Interfaces
  kind: query
  command: '{"device":{"network":{"ether":{"interfaces":null}}}}'
  params: []

- id: device_network_ipv4_manual_netmask
  label: Manual IPv4 Netmask
  kind: action
  command: '{"device":{"network":{"ipv4":{"manual_netmask":{value}}}}}'
  params:
    - name: value
      type: string
      description: "e.g. \"255.255.255.0\""

- id: device_network_ipv4_manual_ipaddr
  label: Manual IPv4 Address
  kind: action
  command: '{"device":{"network":{"ipv4":{"manual_ipaddr":{value}}}}}'
  params:
    - name: value
      type: string
      description: "e.g. \"192.168.1.203\""

- id: device_network_ipv4_manual_gateway
  label: Manual IPv4 Gateway
  kind: action
  command: '{"device":{"network":{"ipv4":{"manual_gateway":{value}}}}}'
  params:
    - name: value
      type: string
      description: "e.g. \"192.168.1.1\""

- id: device_network_ipv4_netmask
  label: Online IPv4 Netmask
  kind: query
  command: '{"device":{"network":{"ipv4":{"netmask":null}}}}'
  params: []

- id: device_network_ipv4_ipaddr
  label: Online IPv4 Address
  kind: query
  command: '{"device":{"network":{"ipv4":{"ipaddr":null}}}}'
  params: []

- id: device_network_ipv4_interfaces
  label: IPv4 Interface Indices
  kind: query
  command: '{"device":{"network":{"ipv4":{"interfaces":null}}}}'
  params: []

- id: device_network_ipv4_gateway
  label: Online IPv4 Gateway
  kind: query
  command: '{"device":{"network":{"ipv4":{"gateway":null}}}}'
  params: []

- id: device_network_ipv4_auto
  label: IPv4 DHCP/Auto-IP
  kind: action
  command: '{"device":{"network":{"ipv4":{"auto":{value}}}}}'
  params:
    - name: value
      type: boolean
      description: "true=DHCP+ZeroConf, false=manual"

- id: device_network_mdns
  label: mDNS State
  kind: action
  command: '{"device":{"network":{"mdns":{value}}}}'
  params:
    - name: value
      type: boolean
      description: "true/false/null (read)"

- id: device_preset_spacing
  label: Device Preset Spacing
  kind: query
  command: '{"device":{"preset_spacing":null}}'
  params: []
  notes: "kHz, depends on LD mode."

- id: device_time
  label: Device Clock
  kind: query
  command: '{"device":{"time":null}}'
  params: []
  notes: "Seconds since 2000-01-01T00:00:00Z."

- id: device_restore
  label: Device Restore Defaults
  kind: action
  command: '{"device":{"restore":{value}}}'
  params:
    - name: value
      type: string
      description: "FACTORY_DEFAULTS or AUDIO_DEFAULTS"

- id: device_restart
  label: Device Restart
  kind: action
  command: '{"device":{"restart":null}}'
  params: []

- id: device_remote_access
  label: Device Remote Access String
  kind: action
  command: '{"device":{"remote_access":{value}}}'
  params:
    - name: value
      type: string
      description: "Up to 15 chars; cleared after 2 minutes, not persisted."

- id: device_name
  label: Device Name
  kind: action
  command: '{"device":{"name":{value}}}'
  params:
    - name: value
      type: string
      description: "Max length 18."

- id: device_lock
  label: Device Keys Lock
  kind: action
  command: '{"device":{"lock":{value}}}'
  params:
    - name: value
      type: boolean
      description: "true=locked, false=unlocked"

- id: device_location
  label: Device Location
  kind: action
  command: '{"device":{"location":{value}}}'
  params:
    - name: value
      type: string
      description: "Max length 400."

- id: device_link_density_mode
  label: Link Density Mode
  kind: action
  command: '{"device":{"link_density_mode":{value}}}'
  params:
    - name: value
      type: boolean
      description: "true=LD mode on, false=standard. Causes device reboot."

- id: device_language
  label: Device Supported Languages
  kind: query
  command: '{"device":{"language":null}}'
  params: []
  notes: "English only = [\"en_GB\"]."

- id: device_frequency_ranges
  label: Device Frequency Ranges
  kind: query
  command: '{"device":{"frequency_ranges":null}}'
  params: []

- id: device_frequency_code
  label: Device Frequency Code
  kind: query
  command: '{"device":{"frequency_code":null}}'
  params: []

- id: device_encryption
  label: Device Encryption
  kind: action
  command: '{"device":{"encryption":{value}}}'
  params:
    - name: value
      type: boolean
      description: "Activate/deactivate encryption."

- id: device_brightness
  label: Device Display Brightness
  kind: action
  command: '{"device":{"brightness":{value}}}'
  params:
    - name: value
      type: integer
      description: "1..5 maps to 20%..100%."

- id: device_booster
  label: Antenna Booster Power
  kind: action
  command: '{"device":{"booster":{value}}}'
  params:
    - name: value
      type: boolean
      description: "true=On, false=Off"
  notes: "EW-DX EM 4 Dante exclusive."

- id: interface_version
  label: SSC Interface Version
  kind: query
  command: '{"interface":{"version":null}}'
  params: []

# ---- /osc framework ----
- id: osc_state_auth_access
  label: Auth Access
  kind: query
  command: '{"osc":{"state":{"auth":{"access":null}}}}'
  params: []

- id: osc_state_prettyprint
  label: Prettyprint (unsupported)
  kind: query
  command: '{"osc":{"state":{"prettyprint":null}}}'
  params: []
  notes: "Returns false."

- id: osc_state_close
  label: Connection Close
  kind: action
  command: '{"osc":{"state":{"close":null}}}'
  params: []

- id: osc_state_subscribe
  label: Subscribe
  kind: action
  command: '{"osc":{"state":{"subscribe":{params}}}}'
  params:
    - name: params
      type: array
      description: "Array of address trees; optional # object with min/max/count/lifetime."
  notes: "Up to 8 concurrent clients on EM 2."

- id: osc_feature_timetag
  label: Feature timetag (unsupported)
  kind: query
  command: '{"osc":{"feature":{"timetag":null}}}'
  params: []
  notes: "Returns false."

- id: osc_feature_baseaddr
  label: Feature baseaddr (unsupported)
  kind: query
  command: '{"osc":{"feature":{"baseaddr":null}}}'
  params: []
  notes: "Returns false."

- id: osc_feature_subscription
  label: Feature subscription
  kind: query
  command: '{"osc":{"feature":{"subscription":null}}}'
  params: []
  notes: "Returns true."

- id: osc_feature_pattern
  label: Feature pattern
  kind: query
  command: '{"osc":{"feature":{"pattern":null}}}'
  params: []
  notes: "Returns \"*?\"."

- id: osc_limits
  label: Parameter Range Reflection
  kind: query
  command: '{"osc":{"limits":null}}'
  params: []

- id: osc_schema
  label: OSC Schema
  kind: query
  command: '{"osc":{"schema":null}}'
  params: []

- id: osc_version
  label: SSC Protocol Version
  kind: query
  command: '{"osc":{"version":null}}'
  params: []

- id: osc_xid
  label: Transaction ID
  kind: action
  command: '{"osc":{"xid":{value}}}'
  params:
    - name: value
      type: string
      description: "Transaction ID echoed on bundled replies."

- id: osc_ping
  label: SSC Ping
  kind: query
  command: '{"osc":{"ping":null}}'
  params: []

- id: osc_error
  label: SSC Error State
  kind: query
  command: '{"osc":{"error":null}}'
  params: []

# ---- /rx1 ----
- id: rx1_identification_visual
  label: RX1 Identification Visual
  kind: action
  command: '{"rx1":{"identification":{"visual":{value}}}}'
  params:
    - name: value
      type: boolean
      description: "true/false/null"

- id: rx1_presets_user_0
  label: RX1 User Preset Frequencies
  kind: action
  command: '{"rx1":{"presets":{"user":{"0":{value}}}}}'
  params:
    - name: value
      type: array
      description: "Array of frequencies in kHz."

- id: rx1_presets_active
  label: RX1 Active Preset
  kind: action
  command: '{"rx1":{"presets":{"active":{value}}}}'
  params:
    - name: value
      type: string
      description: "Format \"factory:index:channel\" or \"user:index:channel\"."

- id: rx1_sync_settings_trim_ignore
  label: RX1 Sync Trim Ignore
  kind: action
  command: '{"rx1":{"sync_settings":{"trim_ignore":{value}}}}'
  params:
    - name: value
      type: boolean

- id: rx1_sync_settings_trim
  label: RX1 Sync TX Trim
  kind: action
  command: '{"rx1":{"sync_settings":{"trim":{value}}}}'
  params:
    - name: value
      type: number

- id: rx1_sync_settings_name_ignore
  label: RX1 Sync Name Ignore
  kind: action
  command: '{"rx1":{"sync_settings":{"name_ignore":{value}}}}'
  params:
    - name: value
      type: boolean

- id: rx1_sync_settings_mute_config_ts
  label: RX1 Sync TS Mute Config
  kind: action
  command: '{"rx1":{"sync_settings":{"mute_config_ts":{value}}}}'
  params:
    - name: value
      type: string
      description: "af_mute"

- id: rx1_sync_settings_mute_config_ignore
  label: RX1 Sync Mute Config Ignore
  kind: action
  command: '{"rx1":{"sync_settings":{"mute_config_ignore":{value}}}}'
  params:
    - name: value
      type: boolean

- id: rx1_sync_settings_mute_config
  label: RX1 Sync TX Mute Config
  kind: action
  command: '{"rx1":{"sync_settings":{"mute_config":{value}}}}'
  params:
    - name: value
      type: string
      description: "off or rf_mute"

- id: rx1_sync_settings_lowcut_ignore
  label: RX1 Sync Lowcut Ignore
  kind: action
  command: '{"rx1":{"sync_settings":{"lowcut_ignore":{value}}}}'
  params:
    - name: value
      type: boolean

- id: rx1_sync_settings_lowcut
  label: RX1 Sync TX Lowcut
  kind: action
  command: '{"rx1":{"sync_settings":{"lowcut":{value}}}}'
  params:
    - name: value
      type: string
      description: "30 Hz, 60 Hz, 80 Hz, 100 Hz, 120 Hz"

- id: rx1_sync_settings_lock_ignore
  label: RX1 Sync Auto Lock Ignore
  kind: action
  command: '{"rx1":{"sync_settings":{"lock_ignore":{value}}}}'
  params:
    - name: value
      type: boolean

- id: rx1_sync_settings_lock
  label: RX1 Sync TX Autolock
  kind: action
  command: '{"rx1":{"sync_settings":{"lock":{value}}}}'
  params:
    - name: value
      type: boolean

- id: rx1_sync_settings_led_ignore
  label: RX1 Sync LED Ignore
  kind: action
  command: '{"rx1":{"sync_settings":{"led_ignore":{value}}}}'
  params:
    - name: value
      type: boolean

- id: rx1_sync_settings_led
  label: RX1 Sync TX LED
  kind: action
  command: '{"rx1":{"sync_settings":{"led":{value}}}}'
  params:
    - name: value
      type: boolean

- id: rx1_sync_settings_frequency_ignore
  label: RX1 Sync Frequency Ignore
  kind: action
  command: '{"rx1":{"sync_settings":{"frequency_ignore":{value}}}}'
  params:
    - name: value
      type: boolean

- id: rx1_sync_settings_cable_emulation_ignore
  label: RX1 Sync Cable Emulation Ignore
  kind: action
  command: '{"rx1":{"sync_settings":{"cable_emulation_ignore":{value}}}}'
  params:
    - name: value
      type: boolean

- id: rx1_sync_settings_cable_emulation
  label: RX1 Sync TX Cable Emulation
  kind: action
  command: '{"rx1":{"sync_settings":{"cable_emulation":{value}}}}'
  params:
    - name: value
      type: string
      description: "type1 or type2"

- id: rx1_warnings
  label: RX1 Warnings
  kind: query
  command: '{"rx1":{"warnings":null}}'
  params: []
  notes: "Array of [Aes256Error, LowSignal, NoLink, RfPeak, AfPeak]."

- id: rx1_name
  label: RX1 Channel Name
  kind: action
  command: '{"rx1":{"name":{value}}}'
  params:
    - name: value
      type: string
      description: "Max length 8."

- id: rx1_mute
  label: RX1 Audio Output Mute
  kind: action
  command: '{"rx1":{"mute":{value}}}'
  params:
    - name: value
      type: boolean

- id: rx1_mates
  label: RX1 Active Mates
  kind: query
  command: '{"rx1":{"mates":null}}'
  params: []
  notes: "Read-only."

- id: rx1_gain
  label: RX1 Gain
  kind: action
  command: '{"rx1":{"gain":{value}}}'
  params:
    - name: value
      type: integer
      description: "Range -3..42 dB, increment 3 dB."

- id: rx1_frequency
  label: RX1 Carrier Frequency
  kind: action
  command: '{"rx1":{"frequency":{value}}}'
  params:
    - name: value
      type: integer
      description: "kHz; range 470200..1999000, inc 25."

- id: rx1_audio
  label: RX1 Audio Inputs/Outputs
  kind: query
  command: '{"rx1":{"audio":null}}'
  params: []

- id: rx1_restore
  label: RX1 Restore Audio Defaults
  kind: action
  command: '{"rx1":{"restore":{value}}}'
  params:
    - name: value
      type: string
      description: "AUDIO_DEFAULTS"

# ---- /rx2 (mirrors rx1) ----
- id: rx2_identification_visual
  label: RX2 Identification Visual
  kind: action
  command: '{"rx2":{"identification":{"visual":{value}}}}'
  params:
    - {name: value, type: boolean, description: "true/false/null"}

- id: rx2_presets_user_0
  label: RX2 User Preset Frequencies
  kind: action
  command: '{"rx2":{"presets":{"user":{"0":{value}}}}}'
  params:
    - {name: value, type: array, description: "kHz values"}

- id: rx2_presets_active
  label: RX2 Active Preset
  kind: action
  command: '{"rx2":{"presets":{"active":{value}}}}'
  params:
    - {name: value, type: string, description: "\"factory:index:channel\" or \"user:index:channel\""}

- id: rx2_sync_settings_trim_ignore
  label: RX2 Sync Trim Ignore
  kind: action
  command: '{"rx2":{"sync_settings":{"trim_ignore":{value}}}}'
  params: [{name: value, type: boolean}]

- id: rx2_sync_settings_trim
  label: RX2 Sync TX Trim
  kind: action
  command: '{"rx2":{"sync_settings":{"trim":{value}}}}'
  params: [{name: value, type: number}]

- id: rx2_sync_settings_name_ignore
  label: RX2 Sync Name Ignore
  kind: action
  command: '{"rx2":{"sync_settings":{"name_ignore":{value}}}}'
  params: [{name: value, type: boolean}]

- id: rx2_sync_settings_mute_config_ts
  label: RX2 Sync TS Mute Config
  kind: action
  command: '{"rx2":{"sync_settings":{"mute_config_ts":{value}}}}'
  params: [{name: value, type: string, description: "af_mute"}]

- id: rx2_sync_settings_mute_config_ignore
  label: RX2 Sync Mute Config Ignore
  kind: action
  command: '{"rx2":{"sync_settings":{"mute_config_ignore":{value}}}}'
  params: [{name: value, type: boolean}]

- id: rx2_sync_settings_mute_config
  label: RX2 Sync TX Mute Config
  kind: action
  command: '{"rx2":{"sync_settings":{"mute_config":{value}}}}'
  params: [{name: value, type: string, description: "off or rf_mute"}]

- id: rx2_sync_settings_lowcut_ignore
  label: RX2 Sync Lowcut Ignore
  kind: action
  command: '{"rx2":{"sync_settings":{"lowcut_ignore":{value}}}}'
  params: [{name: value, type: boolean}]

- id: rx2_sync_settings_lowcut
  label: RX2 Sync TX Lowcut
  kind: action
  command: '{"rx2":{"sync_settings":{"lowcut":{value}}}}'
  params: [{name: value, type: string, description: "30/60/80/100/120 Hz"}]

- id: rx2_sync_settings_lock_ignore
  label: RX2 Sync Lock Ignore
  kind: action
  command: '{"rx2":{"sync_settings":{"lock_ignore":{value}}}}'
  params: [{name: value, type: boolean}]

- id: rx2_sync_settings_lock
  label: RX2 Sync TX Autolock
  kind: action
  command: '{"rx2":{"sync_settings":{"lock":{value}}}}'
  params: [{name: value, type: boolean}]

- id: rx2_sync_settings_led_ignore
  label: RX2 Sync LED Ignore
  kind: action
  command: '{"rx2":{"sync_settings":{"led_ignore":{value}}}}'
  params: [{name: value, type: boolean}]

- id: rx2_sync_settings_led
  label: RX2 Sync TX LED
  kind: action
  command: '{"rx2":{"sync_settings":{"led":{value}}}}'
  params: [{name: value, type: boolean}]

- id: rx2_sync_settings_frequency_ignore
  label: RX2 Sync Frequency Ignore
  kind: action
  command: '{"rx2":{"sync_settings":{"frequency_ignore":{value}}}}'
  params: [{name: value, type: boolean}]

- id: rx2_sync_settings_cable_emulation_ignore
  label: RX2 Sync Cable Emulation Ignore
  kind: action
  command: '{"rx2":{"sync_settings":{"cable_emulation_ignore":{value}}}}'
  params: [{name: value, type: boolean}]

- id: rx2_sync_settings_cable_emulation
  label: RX2 Sync TX Cable Emulation
  kind: action
  command: '{"rx2":{"sync_settings":{"cable_emulation":{value}}}}'
  params: [{name: value, type: string, description: "type1 or type2"}]

- id: rx2_warnings
  label: RX2 Warnings
  kind: query
  command: '{"rx2":{"warnings":null}}'
  params: []

- id: rx2_name
  label: RX2 Channel Name
  kind: action
  command: '{"rx2":{"name":{value}}}'
  params: [{name: value, type: string, description: "Max length 8."}]

- id: rx2_mute
  label: RX2 Audio Output Mute
  kind: action
  command: '{"rx2":{"mute":{value}}}'
  params: [{name: value, type: boolean}]

- id: rx2_mates
  label: RX2 Active Mates
  kind: query
  command: '{"rx2":{"mates":null}}'
  params: []

- id: rx2_gain
  label: RX2 Gain
  kind: action
  command: '{"rx2":{"gain":{value}}}'
  params: [{name: value, type: integer, description: "-3..42 dB, inc 3 dB"}]

- id: rx2_frequency
  label: RX2 Carrier Frequency
  kind: action
  command: '{"rx2":{"frequency":{value}}}'
  params: [{name: value, type: integer, description: "kHz; 470200..1999000, inc 25"}]

- id: rx2_audio
  label: RX2 Audio Inputs/Outputs
  kind: query
  command: '{"rx2":{"audio":null}}'
  params: []

- id: rx2_restore
  label: RX2 Restore Audio Defaults
  kind: action
  command: '{"rx2":{"restore":{value}}}'
  params: [{name: value, type: string, description: "AUDIO_DEFAULTS"}]

# ---- /rx3 (EW-DX EM 4 Dante exclusive; mirrors rx1) ----
- id: rx3_identification_visual
  label: RX3 Identification Visual
  kind: action
  command: '{"rx3":{"identification":{"visual":{value}}}}'
  params: [{name: value, type: boolean}]
  notes: "EW-DX EM 4 Dante exclusive."

- id: rx3_presets_user_0
  label: RX3 User Preset Frequencies
  kind: action
  command: '{"rx3":{"presets":{"user":{"0":{value}}}}}'
  params: [{name: value, type: array}]
  notes: "EM 4 Dante exclusive."

- id: rx3_presets_active
  label: RX3 Active Preset
  kind: action
  command: '{"rx3":{"presets":{"active":{value}}}}'
  params: [{name: value, type: string, description: "\"factory:index:channel\" or \"user:index:channel\""}]
  notes: "EM 4 Dante exclusive."

- id: rx3_sync_settings_trim_ignore
  label: RX3 Sync Trim Ignore
  kind: action
  command: '{"rx3":{"sync_settings":{"trim_ignore":{value}}}}'
  params: [{name: value, type: boolean}]
  notes: "EM 4 Dante exclusive."

- id: rx3_sync_settings_trim
  label: RX3 Sync TX Trim
  kind: action
  command: '{"rx3":{"sync_settings":{"trim":{value}}}}'
  params: [{name: value, type: number}]
  notes: "EM 4 Dante exclusive."

- id: rx3_sync_settings_name_ignore
  label: RX3 Sync Name Ignore
  kind: action
  command: '{"rx3":{"sync_settings":{"name_ignore":{value}}}}'
  params: [{name: value, type: boolean}]
  notes: "EM 4 Dante exclusive."

- id: rx3_sync_settings_mute_config_ts
  label: RX3 Sync TS Mute Config
  kind: action
  command: '{"rx3":{"sync_settings":{"mute_config_ts":{value}}}}'
  params: [{name: value, type: string}]
  notes: "EM 4 Dante exclusive."

- id: rx3_sync_settings_mute_config_ignore
  label: RX3 Sync Mute Config Ignore
  kind: action
  command: '{"rx3":{"sync_settings":{"mute_config_ignore":{value}}}}'
  params: [{name: value, type: boolean}]
  notes: "EM 4 Dante exclusive."

- id: rx3_sync_settings_mute_config
  label: RX3 Sync TX Mute Config
  kind: action
  command: '{"rx3":{"sync_settings":{"mute_config":{value}}}}'
  params: [{name: value, type: string, description: "off or rf_mute"}]
  notes: "EM 4 Dante exclusive."

- id: rx3_sync_settings_lowcut_ignore
  label: RX3 Sync Lowcut Ignore
  kind: action
  command: '{"rx3":{"sync_settings":{"lowcut_ignore":{value}}}}'
  params: [{name: value, type: boolean}]
  notes: "EM 4 Dante exclusive."

- id: rx3_sync_settings_lowcut
  label: RX3 Sync TX Lowcut
  kind: action
  command: '{"rx3":{"sync_settings":{"lowcut":{value}}}}'
  params: [{name: value, type: string, description: "30/60/80/100/120 Hz"}]
  notes: "EM 4 Dante exclusive."

- id: rx3_sync_settings_lock_ignore
  label: RX3 Sync Lock Ignore
  kind: action
  command: '{"rx3":{"sync_settings":{"lock_ignore":{value}}}}'
  params: [{name: value, type: boolean}]
  notes: "EM 4 Dante exclusive."

- id: rx3_sync_settings_lock
  label: RX3 Sync TX Autolock
  kind: action
  command: '{"rx3":{"sync_settings":{"lock":{value}}}}'
  params: [{name: value, type: boolean}]
  notes: "EM 4 Dante exclusive."

- id: rx3_sync_settings_led_ignore
  label: RX3 Sync LED Ignore
  kind: action
  command: '{"rx3":{"sync_settings":{"led_ignore":{value}}}}'
  params: [{name: value, type: boolean}]
  notes: "EM 4 Dante exclusive."

- id: rx3_sync_settings_led
  label: RX3 Sync TX LED
  kind: action
  command: '{"rx3":{"sync_settings":{"led":{value}}}}'
  params: [{name: value, type: boolean}]
  notes: "EM 4 Dante exclusive."

- id: rx3_sync_settings_frequency_ignore
  label: RX3 Sync Frequency Ignore
  kind: action
  command: '{"rx3":{"sync_settings":{"frequency_ignore":{value}}}}'
  params: [{name: value, type: boolean}]
  notes: "EM 4 Dante exclusive."

- id: rx3_sync_settings_cable_emulation_ignore
  label: RX3 Sync Cable Emulation Ignore
  kind: action
  command: '{"rx3":{"sync_settings":{"cable_emulation_ignore":{value}}}}'
  params: [{name: value, type: boolean}]
  notes: "EM 4 Dante exclusive."

- id: rx3_sync_settings_cable_emulation
  label: RX3 Sync TX Cable Emulation
  kind: action
  command: '{"rx3":{"sync_settings":{"cable_emulation":{value}}}}'
  params: [{name: value, type: string, description: "type1 or type2"}]
  notes: "EM 4 Dante exclusive."

- id: rx3_warnings
  label: RX3 Warnings
  kind: query
  command: '{"rx3":{"warnings":null}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: rx3_name
  label: RX3 Channel Name
  kind: action
  command: '{"rx3":{"name":{value}}}'
  params: [{name: value, type: string, description: "Max length 8."}]
  notes: "EM 4 Dante exclusive."

- id: rx3_mute
  label: RX3 Audio Output Mute
  kind: action
  command: '{"rx3":{"mute":{value}}}'
  params: [{name: value, type: boolean}]
  notes: "EM 4 Dante exclusive."

- id: rx3_mates
  label: RX3 Active Mates
  kind: query
  command: '{"rx3":{"mates":null}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: rx3_gain
  label: RX3 Gain
  kind: action
  command: '{"rx3":{"gain":{value}}}'
  params: [{name: value, type: integer, description: "-3..42 dB, inc 3 dB"}]
  notes: "EM 4 Dante exclusive."

- id: rx3_frequency
  label: RX3 Carrier Frequency
  kind: action
  command: '{"rx3":{"frequency":{value}}}'
  params: [{name: value, type: integer, description: "kHz; 470200..1999000, inc 25"}]
  notes: "EM 4 Dante exclusive."

- id: rx3_audio
  label: RX3 Audio Inputs/Outputs
  kind: query
  command: '{"rx3":{"audio":null}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: rx3_restore
  label: RX3 Restore Audio Defaults
  kind: action
  command: '{"rx3":{"restore":{value}}}'
  params: [{name: value, type: string, description: "AUDIO_DEFAULTS"}]
  notes: "EM 4 Dante exclusive."

# ---- /rx4 (EW-DX EM 4 Dante exclusive) ----
- id: rx4_identification_visual
  label: RX4 Identification Visual
  kind: action
  command: '{"rx4":{"identification":{"visual":{value}}}}'
  params: [{name: value, type: boolean}]
  notes: "EM 4 Dante exclusive."

- id: rx4_presets_user_0
  label: RX4 User Preset Frequencies
  kind: action
  command: '{"rx4":{"presets":{"user":{"0":{value}}}}}'
  params: [{name: value, type: array}]
  notes: "EM 4 Dante exclusive."

- id: rx4_presets_active
  label: RX4 Active Preset
  kind: action
  command: '{"rx4":{"presets":{"active":{value}}}}'
  params: [{name: value, type: string}]
  notes: "EM 4 Dante exclusive."

- id: rx4_sync_settings_trim_ignore
  label: RX4 Sync Trim Ignore
  kind: action
  command: '{"rx4":{"sync_settings":{"trim_ignore":{value}}}}'
  params: [{name: value, type: boolean}]
  notes: "EM 4 Dante exclusive."

- id: rx4_sync_settings_trim
  label: RX4 Sync TX Trim
  kind: action
  command: '{"rx4":{"sync_settings":{"trim":{value}}}}'
  params: [{name: value, type: number}]
  notes: "EM 4 Dante exclusive."

- id: rx4_sync_settings_name_ignore
  label: RX4 Sync Name Ignore
  kind: action
  command: '{"rx4":{"sync_settings":{"name_ignore":{value}}}}'
  params: [{name: value, type: boolean}]
  notes: "EM 4 Dante exclusive."

- id: rx4_sync_settings_mute_config_ts
  label: RX4 Sync TS Mute Config
  kind: action
  command: '{"rx4":{"sync_settings":{"mute_config_ts":{value}}}}'
  params: [{name: value, type: string}]
  notes: "EM 4 Dante exclusive."

- id: rx4_sync_settings_mute_config_ignore
  label: RX4 Sync Mute Config Ignore
  kind: action
  command: '{"rx4":{"sync_settings":{"mute_config_ignore":{value}}}}'
  params: [{name: value, type: boolean}]
  notes: "EM 4 Dante exclusive."

- id: rx4_sync_settings_mute_config
  label: RX4 Sync TX Mute Config
  kind: action
  command: '{"rx4":{"sync_settings":{"mute_config":{value}}}}'
  params: [{name: value, type: string, description: "off or rf_mute"}]
  notes: "EM 4 Dante exclusive."

- id: rx4_sync_settings_lowcut_ignore
  label: RX4 Sync Lowcut Ignore
  kind: action
  command: '{"rx4":{"sync_settings":{"lowcut_ignore":{value}}}}'
  params: [{name: value, type: boolean}]
  notes: "EM 4 Dante exclusive."

- id: rx4_sync_settings_lowcut
  label: RX4 Sync TX Lowcut
  kind: action
  command: '{"rx4":{"sync_settings":{"lowcut":{value}}}}'
  params: [{name: value, type: string, description: "30/60/80/100/120 Hz"}]
  notes: "EM 4 Dante exclusive."

- id: rx4_sync_settings_lock_ignore
  label: RX4 Sync Lock Ignore
  kind: action
  command: '{"rx4":{"sync_settings":{"lock_ignore":{value}}}}'
  params: [{name: value, type: boolean}]
  notes: "EM 4 Dante exclusive."

- id: rx4_sync_settings_lock
  label: RX4 Sync TX Autolock
  kind: action
  command: '{"rx4":{"sync_settings":{"lock":{value}}}}'
  params: [{name: value, type: boolean}]
  notes: "EM 4 Dante exclusive."

- id: rx4_sync_settings_led_ignore
  label: RX4 Sync LED Ignore
  kind: action
  command: '{"rx4":{"sync_settings":{"led_ignore":{value}}}}'
  params: [{name: value, type: boolean}]
  notes: "EM 4 Dante exclusive."

- id: rx4_sync_settings_led
  label: RX4 Sync TX LED
  kind: action
  command: '{"rx4":{"sync_settings":{"led":{value}}}}'
  params: [{name: value, type: boolean}]
  notes: "EM 4 Dante exclusive."

- id: rx4_sync_settings_frequency_ignore
  label: RX4 Sync Frequency Ignore
  kind: action
  command: '{"rx4":{"sync_settings":{"frequency_ignore":{value}}}}'
  params: [{name: value, type: boolean}]
  notes: "EM 4 Dante exclusive."

- id: rx4_sync_settings_cable_emulation_ignore
  label: RX4 Sync Cable Emulation Ignore
  kind: action
  command: '{"rx4":{"sync_settings":{"cable_emulation_ignore":{value}}}}'
  params: [{name: value, type: boolean}]
  notes: "EM 4 Dante exclusive."

- id: rx4_sync_settings_cable_emulation
  label: RX4 Sync TX Cable Emulation
  kind: action
  command: '{"rx4":{"sync_settings":{"cable_emulation":{value}}}}'
  params: [{name: value, type: string, description: "type1 or type2"}]
  notes: "EM 4 Dante exclusive."

- id: rx4_warnings
  label: RX4 Warnings
  kind: query
  command: '{"rx4":{"warnings":null}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: rx4_name
  label: RX4 Channel Name
  kind: action
  command: '{"rx4":{"name":{value}}}'
  params: [{name: value, type: string, description: "Max length 8."}]
  notes: "EM 4 Dante exclusive."

- id: rx4_mute
  label: RX4 Audio Output Mute
  kind: action
  command: '{"rx4":{"mute":{value}}}'
  params: [{name: value, type: boolean}]
  notes: "EM 4 Dante exclusive."

- id: rx4_mates
  label: RX4 Active Mates
  kind: query
  command: '{"rx4":{"mates":null}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: rx4_gain
  label: RX4 Gain
  kind: action
  command: '{"rx4":{"gain":{value}}}'
  params: [{name: value, type: integer, description: "-3..42 dB, inc 3 dB"}]
  notes: "EM 4 Dante exclusive."

- id: rx4_frequency
  label: RX4 Carrier Frequency
  kind: action
  command: '{"rx4":{"frequency":{value}}}'
  params: [{name: value, type: integer, description: "kHz; 470200..1999000, inc 25"}]
  notes: "EM 4 Dante exclusive."

- id: rx4_audio
  label: RX4 Audio Inputs/Outputs
  kind: query
  command: '{"rx4":{"audio":null}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: rx4_restore
  label: RX4 Restore Audio Defaults
  kind: action
  command: '{"rx4":{"restore":{value}}}'
  params: [{name: value, type: string, description: "AUDIO_DEFAULTS"}]
  notes: "EM 4 Dante exclusive."

# ---- /audio1 ----
- id: audio1_out1_level
  label: AF Out1 Level
  kind: action
  command: '{"audio1":{"out1":{"level":{value}}}}'
  params: [{name: value, type: integer, description: "-24..18 dB, inc 6 dB"}]

- id: audio1_out2_level
  label: AF Out2 Level
  kind: action
  command: '{"audio1":{"out2":{"level":{value}}}}'
  params: [{name: value, type: integer, description: "-24..18 dB, inc 6 dB"}]

- id: audio1_out3_level
  label: AF Out3 Level
  kind: action
  command: '{"audio1":{"out3":{"level":{value}}}}'
  params: [{name: value, type: integer, description: "-24..18 dB, inc 6 dB"}]
  notes: "EM 4 Dante exclusive."

- id: audio1_out4_level
  label: AF Out4 Level
  kind: action
  command: '{"audio1":{"out4":{"level":{value}}}}'
  params: [{name: value, type: integer, description: "-24..18 dB, inc 6 dB"}]
  notes: "EM 4 Dante exclusive."

# ---- /m metering (read-only) ----
- id: m_rx1_rssi
  label: RX1 RSSI
  kind: query
  command: '{"m":{"rx1":{"rssi":null}}}'
  params: []
  notes: "double, -107..0 dBm."

- id: m_rx1_rsqi
  label: RX1 RSQI
  kind: query
  command: '{"m":{"rx1":{"rsqi":null}}}'
  params: []
  notes: "0..100 %."

- id: m_rx1_divi
  label: RX1 Diversity Indicator
  kind: query
  command: '{"m":{"rx1":{"divi":null}}}'
  params: []
  notes: "0=None, 1=Ant A, 2=Ant B."

- id: m_rx1_af
  label: RX1 AF Level
  kind: query
  command: '{"m":{"rx1":{"af":null}}}'
  params: []
  notes: "double, -138.5..0 dBfs, inc 0.1."

- id: m_rx2_rssi
  label: RX2 RSSI
  kind: query
  command: '{"m":{"rx2":{"rssi":null}}}'
  params: []

- id: m_rx2_rsqi
  label: RX2 RSQI
  kind: query
  command: '{"m":{"rx2":{"rsqi":null}}}'
  params: []

- id: m_rx2_divi
  label: RX2 Diversity Indicator
  kind: query
  command: '{"m":{"rx2":{"divi":null}}}'
  params: []

- id: m_rx2_af
  label: RX2 AF Level
  kind: query
  command: '{"m":{"rx2":{"af":null}}}'
  params: []

- id: m_rx3_rssi
  label: RX3 RSSI
  kind: query
  command: '{"m":{"rx3":{"rssi":null}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: m_rx3_rsqi
  label: RX3 RSQI
  kind: query
  command: '{"m":{"rx3":{"rsqi":null}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: m_rx3_divi
  label: RX3 Diversity Indicator
  kind: query
  command: '{"m":{"rx3":{"divi":null}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: m_rx3_af
  label: RX3 AF Level
  kind: query
  command: '{"m":{"rx3":{"af":null}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: m_rx4_rssi
  label: RX4 RSSI
  kind: query
  command: '{"m":{"rx4":{"rssi":null}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: m_rx4_rsqi
  label: RX4 RSQI
  kind: query
  command: '{"m":{"rx4":{"rsqi":null}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: m_rx4_divi
  label: RX4 Diversity Indicator
  kind: query
  command: '{"m":{"rx4":{"divi":null}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: m_rx4_af
  label: RX4 AF Level
  kind: query
  command: '{"m":{"rx4":{"af":null}}}'
  params: []
  notes: "EM 4 Dante exclusive."

# ---- /mates telemetry (read-only; queried via direct null or via subscribe) ----
- id: mates_tx1_battery_type
  label: TX1 Battery Type
  kind: query
  command: '{"mates":{"tx1":{"battery":{"type":null}}}}'
  params: []
  notes: "\"Battery\" or \"Primary Cell\". Error 424 if TX absent."

- id: mates_tx1_battery_lifetime
  label: TX1 Battery Lifetime
  kind: query
  command: '{"mates":{"tx1":{"battery":{"lifetime":null}}}}'
  params: []
  notes: "Minutes."

- id: mates_tx1_battery_gauge
  label: TX1 Battery Gauge
  kind: query
  command: '{"mates":{"tx1":{"battery":{"gauge":null}}}}'
  params: []
  notes: "Percent."

- id: mates_tx1_warnings
  label: TX1 Warnings
  kind: query
  command: '{"mates":{"tx1":{"warnings":null}}}'
  params: []
  notes: "[AfPeak, LowBattery]."

- id: mates_tx1_version
  label: TX1 SW Version
  kind: query
  command: '{"mates":{"tx1":{"version":null}}}'
  params: []

- id: mates_tx1_type
  label: TX1 Type
  kind: query
  command: '{"mates":{"tx1":{"type":null}}}'
  params: []

- id: mates_tx1_trim
  label: TX1 Trim
  kind: query
  command: '{"mates":{"tx1":{"trim":null}}}'
  params: []

- id: mates_tx1_name
  label: TX1 Name
  kind: query
  command: '{"mates":{"tx1":{"name":null}}}'
  params: []

- id: mates_tx1_mute_config_ts
  label: TX1 TS Mute Config
  kind: query
  command: '{"mates":{"tx1":{"mute_config_ts":null}}}'
  params: []

- id: mates_tx1_mute_config
  label: TX1 Mute Config
  kind: query
  command: '{"mates":{"tx1":{"mute_config":null}}}'
  params: []

- id: mates_tx1_mute
  label: TX1 Mute Switch
  kind: query
  command: '{"mates":{"tx1":{"mute":null}}}'
  params: []

- id: mates_tx1_lowcut
  label: TX1 Lowcut
  kind: query
  command: '{"mates":{"tx1":{"lowcut":null}}}'
  params: []

- id: mates_tx1_lock
  label: TX1 Autolock
  kind: query
  command: '{"mates":{"tx1":{"lock":null}}}'
  params: []

- id: mates_tx1_led
  label: TX1 LED
  kind: query
  command: '{"mates":{"tx1":{"led":null}}}'
  params: []

- id: mates_tx1_identification
  label: TX1 Identification
  kind: query
  command: '{"mates":{"tx1":{"identification":null}}}'
  params: []

- id: mates_tx1_capsule
  label: TX1 Capsule
  kind: query
  command: '{"mates":{"tx1":{"capsule":null}}}'
  params: []
  notes: "unknown/KK 205/KK 204/ME 9002/ME 9004/ME 9005/MME 865/MD 9235/MMD 945/MMD 935/MMD 845/MMD 835/MMD 815-1/MMK 965/MMD 42-I."

- id: mates_tx1_cable_emulation
  label: TX1 Cable Emulation
  kind: query
  command: '{"mates":{"tx1":{"cable_emulation":null}}}'
  params: []

- id: mates_tx2_battery_type
  label: TX2 Battery Type
  kind: query
  command: '{"mates":{"tx2":{"battery":{"type":null}}}}'
  params: []

- id: mates_tx2_battery_lifetime
  label: TX2 Battery Lifetime
  kind: query
  command: '{"mates":{"tx2":{"battery":{"lifetime":null}}}}'
  params: []

- id: mates_tx2_battery_gauge
  label: TX2 Battery Gauge
  kind: query
  command: '{"mates":{"tx2":{"battery":{"gauge":null}}}}'
  params: []

- id: mates_tx2_warnings
  label: TX2 Warnings
  kind: query
  command: '{"mates":{"tx2":{"warnings":null}}}'
  params: []

- id: mates_tx2_version
  label: TX2 SW Version
  kind: query
  command: '{"mates":{"tx2":{"version":null}}}'
  params: []

- id: mates_tx2_type
  label: TX2 Type
  kind: query
  command: '{"mates":{"tx2":{"type":null}}}'
  params: []

- id: mates_tx2_trim
  label: TX2 Trim
  kind: query
  command: '{"mates":{"tx2":{"trim":null}}}'
  params: []

- id: mates_tx2_name
  label: TX2 Name
  kind: query
  command: '{"mates":{"tx2":{"name":null}}}'
  params: []

- id: mates_tx2_mute_config_ts
  label: TX2 TS Mute Config
  kind: query
  command: '{"mates":{"tx2":{"mute_config_ts":null}}}'
  params: []

- id: mates_tx2_mute_config
  label: TX2 Mute Config
  kind: query
  command: '{"mates":{"tx2":{"mute_config":null}}}'
  params: []

- id: mates_tx2_mute
  label: TX2 Mute Switch
  kind: query
  command: '{"mates":{"tx2":{"mute":null}}}'
  params: []

- id: mates_tx2_lowcut
  label: TX2 Lowcut
  kind: query
  command: '{"mates":{"tx2":{"lowcut":null}}}'
  params: []

- id: mates_tx2_lock
  label: TX2 Autolock
  kind: query
  command: '{"mates":{"tx2":{"lock":null}}}'
  params: []

- id: mates_tx2_led
  label: TX2 LED
  kind: query
  command: '{"mates":{"tx2":{"led":null}}}'
  params: []

- id: mates_tx2_identification
  label: TX2 Identification
  kind: query
  command: '{"mates":{"tx2":{"identification":null}}}'
  params: []

- id: mates_tx2_capsule
  label: TX2 Capsule
  kind: query
  command: '{"mates":{"tx2":{"capsule":null}}}'
  params: []

- id: mates_tx2_cable_emulation
  label: TX2 Cable Emulation
  kind: query
  command: '{"mates":{"tx2":{"cable_emulation":null}}}'
  params: []

- id: mates_tx3_battery_type
  label: TX3 Battery Type
  kind: query
  command: '{"mates":{"tx3":{"battery":{"type":null}}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: mates_tx3_battery_lifetime
  label: TX3 Battery Lifetime
  kind: query
  command: '{"mates":{"tx3":{"battery":{"lifetime":null}}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: mates_tx3_battery_gauge
  label: TX3 Battery Gauge
  kind: query
  command: '{"mates":{"tx3":{"battery":{"gauge":null}}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: mates_tx3_warnings
  label: TX3 Warnings
  kind: query
  command: '{"mates":{"tx3":{"warnings":null}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: mates_tx3_version
  label: TX3 SW Version
  kind: query
  command: '{"mates":{"tx3":{"version":null}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: mates_tx3_type
  label: TX3 Type
  kind: query
  command: '{"mates":{"tx3":{"type":null}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: mates_tx3_trim
  label: TX3 Trim
  kind: query
  command: '{"mates":{"tx3":{"trim":null}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: mates_tx3_name
  label: TX3 Name
  kind: query
  command: '{"mates":{"tx3":{"name":null}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: mates_tx3_mute_config_ts
  label: TX3 TS Mute Config
  kind: query
  command: '{"mates":{"tx3":{"mute_config_ts":null}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: mates_tx3_mute_config
  label: TX3 Mute Config
  kind: query
  command: '{"mates":{"tx3":{"mute_config":null}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: mates_tx3_mute
  label: TX3 Mute Switch
  kind: query
  command: '{"mates":{"tx3":{"mute":null}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: mates_tx3_lowcut
  label: TX3 Lowcut
  kind: query
  command: '{"mates":{"tx3":{"lowcut":null}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: mates_tx3_lock
  label: TX3 Autolock
  kind: query
  command: '{"mates":{"tx3":{"lock":null}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: mates_tx3_led
  label: TX3 LED
  kind: query
  command: '{"mates":{"tx3":{"led":null}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: mates_tx3_identification
  label: TX3 Identification
  kind: query
  command: '{"mates":{"tx3":{"identification":null}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: mates_tx3_capsule
  label: TX3 Capsule
  kind: query
  command: '{"mates":{"tx3":{"capsule":null}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: mates_tx3_cable_emulation
  label: TX3 Cable Emulation
  kind: query
  command: '{"mates":{"tx3":{"cable_emulation":null}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: mates_tx4_battery_type
  label: TX4 Battery Type
  kind: query
  command: '{"mates":{"tx4":{"battery":{"type":null}}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: mates_tx4_battery_lifetime
  label: TX4 Battery Lifetime
  kind: query
  command: '{"mates":{"tx4":{"battery":{"lifetime":null}}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: mates_tx4_battery_gauge
  label: TX4 Battery Gauge
  kind: query
  command: '{"mates":{"tx4":{"battery":{"gauge":null}}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: mates_tx4_warnings
  label: TX4 Warnings
  kind: query
  command: '{"mates":{"tx4":{"warnings":null}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: mates_tx4_version
  label: TX4 SW Version
  kind: query
  command: '{"mates":{"tx4":{"version":null}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: mates_tx4_type
  label: TX4 Type
  kind: query
  command: '{"mates":{"tx4":{"type":null}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: mates_tx4_trim
  label: TX4 Trim
  kind: query
  command: '{"mates":{"tx4":{"trim":null}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: mates_tx4_name
  label: TX4 Name
  kind: query
  command: '{"mates":{"tx4":{"name":null}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: mates_tx4_mute_config_ts
  label: TX4 TS Mute Config
  kind: query
  command: '{"mates":{"tx4":{"mute_config_ts":null}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: mates_tx4_mute_config
  label: TX4 Mute Config
  kind: query
  command: '{"mates":{"tx4":{"mute_config":null}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: mates_tx4_mute
  label: TX4 Mute Switch
  kind: query
  command: '{"mates":{"tx4":{"mute":null}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: mates_tx4_lowcut
  label: TX4 Lowcut
  kind: query
  command: '{"mates":{"tx4":{"lowcut":null}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: mates_tx4_lock
  label: TX4 Autolock
  kind: query
  command: '{"mates":{"tx4":{"lock":null}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: mates_tx4_led
  label: TX4 LED
  kind: query
  command: '{"mates":{"tx4":{"led":null}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: mates_tx4_identification
  label: TX4 Identification
  kind: query
  command: '{"mates":{"tx4":{"identification":null}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: mates_tx4_capsule
  label: TX4 Capsule
  kind: query
  command: '{"mates":{"tx4":{"capsule":null}}}'
  params: []
  notes: "EM 4 Dante exclusive."

- id: mates_tx4_cable_emulation
  label: TX4 Cable Emulation
  kind: query
  command: '{"mates":{"tx4":{"cable_emulation":null}}}'
  params: []
  notes: "EM 4 Dante exclusive."
```

## Feedbacks
```yaml
# SSC queries return JSON method replies; observable states mirrored from Actions.
# Subscription mechanism delivers unsolicited updates (see Events).
- id: device_warning_flags
  type: array
  values: [Aes256Error, LowSignal, NoLink, RfPeak, AfPeak]
  source: /rx1/warnings, /rx2/warnings, /rx3/warnings, /rx4/warnings
- id: tx_warning_flags
  type: array
  values: [AfPeak, LowBattery]
  source: /mates/tx1..tx4/warnings
- id: tx_battery_gauge
  type: number
  source: /mates/tx1..tx4/battery/gauge
- id: rx_rssi
  type: number
  source: /m/rx1..rx4/rssi
- id: rx_af
  type: number
  source: /m/rx1..rx4/af
- id: bay_state  # UNRESOLVED: bay_state documented only under CHG 70N-C chapter; not enumerated for EM.
  type: string
  values: [NORMAL, UPDATE, ERROR, DFU_MODE]
```

## Variables
```yaml
# Settable numeric/string parameters already represented as parameterized Actions.
# No additional scalar variable bindings documented beyond those Actions.
```

## Events
```yaml
# SSC subscription notifications: server pushes value-change updates for subscribed
# addresses. Default behaviour = notify on change only; optional min/max/count/lifetime
# parameters control rate and lifetime.
#
# Subscribe via: {"osc":{"state":{"subscribe":[ {"#":{"min":0,"max":0,"count":1000,"lifetime":60}},
#                                              <address_tree> }]}}
#
# Documented push categories:
- id: subscription_notification
  trigger: subscribed address value change
  payload: SSC Method Reply mirroring the subscribed address tree
  notes: "Up to 8 concurrent clients on EM 2."
- id: subscription_terminated
  trigger: lifetime/count expires or connection close
  payload: error code 310 - subscription terminated
```

## Macros
```yaml
# No multi-step macros documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements specific to EW-DX EM. Only behavioural notes:
#   - /device/link_density_mode causes a device reboot
#   - /device/restart restarts the device
#   - /device/restore with FACTORY_DEFAULTS wipes configuration
# These are operational side-effects, not safety interlocks.
```

## Notes
- SSC = Sennheiser Sound Control; OSC-derived application protocol using JSON encoding instead of binary OSC blobs. One UDP datagram = one SSC message.
- Setter pattern: `{"path":{"leaf":value}}`. Getter pattern: same with `null` argument. Server replies with adapted/actual value.
- EW-DX EM 2 supports rx1/rx2 + audio1/out1/out2 + mates/tx1/tx2. EW-DX EM 4 Dante adds rx3/rx4, out3/out4, mates/tx3/tx4, /device/booster.
- Dante variants add /device/network/dante/* subtree.
- Discovery via DNS-SD/Bonjour service type `_ssc._udp`; clients SHOULD NOT assume default port 45.
- Error codes 100–503 defined in source (section 10). Error 424 = "failed dependency" used when TX bodypack is absent.
- SSC string charset restricted to ASCII 32–126 plus escapes `\b \f \r \n \t`; no `\uXXXX` unicode escapes.

<!-- UNRESOLVED: source also documents CHG 70N-C / CHG 70N charger (sections 11–14). That product is out of scope for this EM receiver family spec; a separate spec should be authored if charger control is needed. -->
<!-- UNRESOLVED: TCP transport is referenced generically in the SSC framework chapter but the EW-DX server explicitly supports UDP/IP only. -->
<!-- UNRESOLVED: exact device voltage / power / current specifications not present in this developer guide. -->

## Provenance

```yaml
source_domains:
  - docs.cloud.sennheiser.com
  - assets.sennheiser.com
source_urls:
  - https://docs.cloud.sennheiser.com/en-us/api-docs/api-docs/resources/ew-dx-sound-control-protocol-3-0-x.pdf
  - "https://assets.sennheiser.com/download/assets/EW-DX_Sound_Control_Protocol_03_2023_EN.pdf/69f9d4bee7b611f0ae307aeaa9c3764a?attachment=true"
  - "https://assets.sennheiser.com/download/assets/EW-DX_Sound_Control_Protocol_v2_FW-4.0.x_EN.pdf/9a1f7d8ee7d811f0b5b3768ee8e97aea?attachment=true"
  - "https://assets.sennheiser.com/download/assets/Sennheiser_EW-DX_Crestron_Modules.zip/64bbb61ce7d811f0bce7beb43c66122a?attachment=true"
  - "https://assets.sennheiser.com/download/assets/Sennheiser_EW-DX_Q-SYS_Plugins.zip/5c4e0868e7d811f0bce7beb43c66122a?attachment=true"
retrieved_at: 2026-06-18T01:45:51.827Z
last_checked_at: 2026-06-18T08:02:16.648Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:02:16.648Z
matched_actions: 249
action_count: 249
confidence: medium
summary: "All 249 spec action units have exact SSC address-path matches in the source EW-DX EM method list; transport port 45 and DNS-SD discovery explicitly stated. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source also documents the CHG 70N-C charger (separate product, section 11–14); not enumerated here as compatible_with.models lists only EM receivers."
- "bay_state documented only under CHG 70N-C chapter; not enumerated for EM."
- "source contains no safety warnings, interlock procedures, or"
- "source also documents CHG 70N-C / CHG 70N charger (sections 11–14). That product is out of scope for this EM receiver family spec; a separate spec should be authored if charger control is needed."
- "TCP transport is referenced generically in the SSC framework chapter but the EW-DX server explicitly supports UDP/IP only."
- "exact device voltage / power / current specifications not present in this developer guide."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
